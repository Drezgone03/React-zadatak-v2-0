// import React from "react";
// import { useEffect, useState } from "react";
// import { useParams } from "react-router";

// export default function SingleNews() {
//   const [singleNews, setSingleNews] = useState(null);
//   const { newsId } = useParams();
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     if (newsId) getSingleNews();
//   }, [newsId]);

//   async function getSingleNews(id) {
//     setLoading(true);
//     try {
//       const response = await fetch(`http://localhost:3001/news/${newsId}`);
//       if (!response.ok) throw new Error("Failed to fetch single news");
//       const data = await response.json();
//       setSingleNews(data);
//       setLoading(false);
//     } catch (error) {
//       setLoading(false);
//       console.log("ERROR ->", error);
//     }
//   }

//   if (loading) {
//     return <div className="loading-spinner"></div>;
//   }

//   return (
//     <div>
//       {singleNews ? (
//         <div>
//           <p>{singleNews.title}</p>
//           <p>{singleNews.source}</p>
//         </div>
//       ) : (
//         <span>Nema vest</span>
//       )}
//     </div>
//   );
// }

//////////

import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import "./SingleNews.css";

export default function SingleNews() {
  const [singleNews, setSingleNews] = useState(null);
  const { newsId } = useParams();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (newsId) fetchSingleNews();
  }, [newsId]);

  async function fetchSingleNews() {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:3001/news/${newsId}`);
      if (!response.ok) throw new Error("Failed to fetch single news");
      const data = await response.json();
      setSingleNews(data);
    } catch (error) {
      console.error("Error fetching single news:", error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <div className="loading-spinner"></div>;
  }

  if (!singleNews) {
    return <div>No news available</div>;
  }

  return (
    <div className="single-news-container">
      <header className="single-news-header">
        <h1>{singleNews.title}</h1>
        {/* <div> */}
        <button className="like-btn">Like</button>
        {/* </div> */}
      </header>
      <div className="news-image-container">
        <img src={singleNews.imageUrl} alt={singleNews.title} />
      </div>
      <p className="news-text">{singleNews.text}</p>
      <div className="comments-section">
        <h2>Comments</h2>
        <button className="comment-btn">Add Comment</button>
      </div>
      {/* srediti kod dole za komentare */}
      {/* <ul className="comments-list">
        {singleNews.comments?.map((comment, index) => (
          <li key={index} className="comment">
            <p>
              <strong>{comment.author}</strong>
            </p>
            <p>{comment.text}</p>
            <p className="comment-date">{comment.date}</p>
          </li>
        ))}
      </ul> */}
      <ul className="comments-list">
        <li className="comment">
          <div className="comment-container">
            <p>
              <strong>John Doe</strong>
            </p>
            <p className="comment-date">
              <strong> Oct 6 2019</strong>
            </p>
          </div>
          <p className="comment-txt">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown.
          </p>
        </li>
        {/*  */}
        <li className="comment">
          <div className="comment-container">
            <p>
              <strong>John Doe</strong>
            </p>
            <p className="comment-date">
              <strong> Oct 5 2019</strong>
            </p>
          </div>
          <p className="comment-txt">
            Lorem Ipsum has been the industry's standard dummy text ever since
            the 1500s, Lorem Ipsum is simply dummy text of the printing and
            typesetting.
          </p>
        </li>
      </ul>
    </div>
  );
}
