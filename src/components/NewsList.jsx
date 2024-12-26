import React, { useEffect, useState } from "react";
import NewsCard from "./NewsCard.jsx";
import SearchBar from "./SearchBar.jsx";
import "./NewsList.css";

export default function NewsList() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cache, setCache] = useState({});

  async function fetchNews(searchQuery = "") {
    if (cache[searchQuery]) {
      setNews(cache[searchQuery]);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:3001/news?search=${searchQuery}`
      );
      if (!response.ok) throw new Error("Failed to fetch news");
      const data = await response.json();

      setCache((prevCache) => ({ ...prevCache, [searchQuery]: data }));
      setNews(data);
    } catch (error) {
      console.error("Error fetching news:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchNews();
  }, []);

  if (loading) {
    return <div className="loading-spinner"></div>;
  }

  return (
    <div>
      <SearchBar onSearch={fetchNews} />
      <div className="news-list-container">
        {news.map((news) => (
          <NewsCard newsItem={news} key={news.id} />
        ))}
      </div>
    </div>
  );
}
