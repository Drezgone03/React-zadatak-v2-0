const express = require('express')
const cors = require('cors')
const db = require('./db/db');
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken');
const uuidv4 = require('uuid/v4')

const app = express()
const port = 3001

const delay = () => {
    return new Promise(resolve => {
        setTimeout(resolve, Math.random() * 2000)
    })
}

app.use(cors())
app.use(bodyParser.json())

app.get('/news', async (req, res) => {
    const searchQuery = req.query.search || '';
    await delay();
    const news = db.news
        .filter(({ title, text }) => `${title} ${text}`.toLowerCase().includes(searchQuery.toLowerCase()))
        .map(({ id, title, trending, source, imageUrl }) => ({ id, title, trending, source, imageUrl }));

    res.send(news)
});

app.get('/news/:id', async (req, res) => {
   const news = db.news.find(({ id }) => id === req.params.id);
   await delay();

   if (news) {
       res.send(news)
   } else {
       res.statusCode = 404
       res.json({ message: "News Not Found" })
   }
})

app.post('/news/:id/action/comment', async (req, res) => {
    const news = db.news.find(({ id }) => id === req.params.id);
    const user = db.users.find(({ id }) => id === req.body.userId)
    await delay();

    if (news && user) {
        news.comments.unshift({ id: uuidv4(), comment: req.body.comment, user: user.email, date: (new Date()).toDateString() })
        res.send(news)
    } else if (!user) {
        res.statusCode = 401
        res.json({ message: 'Unauthorized' })
    } else {
        res.statusCode = 400
        res.json({ message: "News Not Found" })
    }
})

app.post('/news/:id/action/like', async (req, res) => {
    const news = db.news.find(({ id }) => id === req.params.id);
    const user = db.users.find(({ id }) => id === req.body.userId);
    await delay();

    if (news && user) {
        const userLikeIndex = news.likes.indexOf(user.id)

        if (userLikeIndex > -1) {
            news.likes.splice(userLikeIndex, 1)
        } else {
            news.likes.push(user.id)
        }

        res.send(news)
    } else if (!user) {
        res.statusCode = 401
        res.json({ message: 'Unauthorized' })
    } else {
        res.statusCode = 400
        res.json({ message: "News Not Found" })
    }
})

app.post('/login', async (req, res) => {
    const user = db.users.find(({ email }) => email === req.body.email)
    await delay();

    if (user) {
        if (user.password === req.body.password) {
            const userResponse = {...user}
            delete userResponse.password
            res.send({ token: jwt.sign(userResponse, 'secret'), })
        } else {
            res.statusCode = 400;
            res.json({ message: "Wrong Password" })
        }
    } else {
        res.statusCode = 400;
        res.json({ message: "Non Existing User" })
    }
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
