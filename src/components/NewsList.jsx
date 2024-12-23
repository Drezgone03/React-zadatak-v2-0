import React from "react";
import NewsCard from "./NewsCard.jsx";
import "./NewsList.css";

export default function NewsList({ newsData }) {
  return (
    <div className="news-list-container">
      {newsData.map((news) => (
        <NewsCard newsItem={news} key={news.id} />
      ))}
    </div>
  );
}
