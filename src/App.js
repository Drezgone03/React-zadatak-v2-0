// import React, { useState, useEffect } from "react";
// import "./App.css";
// import Header from "./components/Header";
// import UserInput from "./components/UserInput";
// import SearchBar from "./components/SearchBar";
// import NewsList from "./components/NewsList";

// // import {
// //   BrowserRouter as Router,
// //   Route,
// //   Routes,
// // } from "react-router-dom/cjs/react-router-dom.min";
// // import SingleNews from "./components/SingleNews.jsx";

// function App() {
//   const [userEmail, setUserEmail] = useState(null);
//   const [news, setNews] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [cache, setCache] = useState({}); // Cache for search results

//   // Fetch News with optional query
//   async function fetchNews(searchQuery = "") {
//     if (cache[searchQuery]) {
//       setNews(cache[searchQuery]); // Load from cache
//       return;
//     }

//     setLoading(true);
//     try {
//       const response = await fetch(
//         `http://localhost:3001/news?search=${searchQuery}`
//       );
//       if (!response.ok) throw new Error("Failed to fetch news");
//       const data = await response.json();

//       // Cache results and update state
//       setCache((prevCache) => ({ ...prevCache, [searchQuery]: data }));
//       setNews(data);
//     } catch (error) {
//       console.error("Error fetching news:", error);
//     } finally {
//       setLoading(false);
//     }
//   }

//   useEffect(() => {
//     fetchNews(); // Fetch all news initially
//   }, []);

//   function handleLogin(email) {
//     setUserEmail(email);
//   }

//   function handleLogout() {
//     setUserEmail(null);
//   }

//   return (
//     <div className="App">
//       <Header userEmailPropt={userEmail} onLogoutPropt={handleLogout} />
//       {userEmail ? (
//         <div>Welcome, {userEmail}!</div>
//       ) : (
//         <UserInput onLogin={handleLogin} />
//       )}
//       <h2>Latest News</h2>

//       <SearchBar onSearch={fetchNews} />

//       {loading ? (
//         <div className="loading-spinner"></div>
//       ) : (
//         <NewsList newsData={news} />
//       )}
//     </div>
//   );
// }

// export default App;

//////////////////// Verzija 2

// import React, { useState, useEffect } from "react";
// import "./App.css";
// import Header from "./components/Header.jsx";
// import UserInput from "./components/UserInput.jsx";
// import SearchBar from "./components/SearchBar.jsx";
// import NewsList from "./components/NewsList.jsx";

// // dodao
// import SingleNews from "./components/SingleNews.jsx";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
// const navigate = useNavigate();

// function App() {
//   const [userEmail, setUserEmail] = useState(null);
//   const [news, setNews] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [cache, setCache] = useState({}); // Cache for search results

//   // Fetch News with optional query
//   async function fetchNews(searchQuery = "") {
//     if (cache[searchQuery]) {
//       setNews(cache[searchQuery]); // Load from cache
//       return;
//     }

//     setLoading(true);
//     try {
//       const response = await fetch(
//         `http://localhost:3001/news?search=${searchQuery}`
//       );
//       if (!response.ok) throw new Error("Failed to fetch news");
//       const data = await response.json();

//       // Cache results and update state
//       setCache((prevCache) => ({ ...prevCache, [searchQuery]: data }));
//       setNews(data);
//     } catch (error) {
//       console.error("Error fetching news:", error);
//     } finally {
//       setLoading(false);
//     }
//   }

//   useEffect(() => {
//     if (userEmail) {
//       console.log("----");
//       fetchNews();
//     }
//   }, [userEmail]);

//   function handleLogin(email) {
//     setUserEmail(email);
//   }

//   function handleLogout() {
//     setUserEmail(null);
//   }

//   function handleSingleNews(id) {
//     console.log("id", id);
//     navigate(`/${id}`);
//   }

//   return (
//     <Router>
//       <div className="App">
//         <Header userEmailProp={userEmail} onLogoutProp={handleLogout} />

//         {/* Display welcome message or login input */}

//         {userEmail ? (
//           <div> Welcome, {userEmail}! </div>
//         ) : (
//           <UserInput onLogin={handleLogin} />
//         )}

//         {/* Conditional rendering based on user login */}

//         {userEmail && (
//           <>
//             <h2>Latest News</h2>
//             <SearchBar onSearch={fetchNews} />
//             {loading ? (
//               <div className="loading-spinner"></div>
//             ) : (
//               <NewsList newsData={news} handleSingleNews={handleSingleNews} />
//             )}
//           </>
//         )}

//         {/* Define application routes */}
//         <Routes>
//           <Route path="/" element={<UserInput />} />
//           <Route path="/:newsId" element={<SingleNews />} />
//           <Route path="/all" element={NewsList} />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
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
        <Routes>
          {/* Početna stranica za login */}
          <Route path="/" element={<UserInput />} />
          {/* Stranica sa listom vesti */}
          <Route path="/all" element={<NewsList />} />
          {/* Stranica za pojedinacnu vest */}
          <Route path="/:newsId" element={<SingleNews />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
