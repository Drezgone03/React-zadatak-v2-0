import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Header from "./components/Header.jsx";
import UserInput from "./components/UserInput.jsx";
import NewsList from "./components/NewsList.jsx";
import SingleNews from "./components/SingleNews.jsx";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Switch>
          <Route exact path="/" component={UserInput} />
          <Route path="/all" component={NewsList} />
          <Route path="/:newsId" component={SingleNews} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
