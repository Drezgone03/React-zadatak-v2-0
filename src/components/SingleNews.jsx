import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

export default function SingleNews() {
  const [singleNews, setSingleNews] = useState(null);
  const { newsId } = useParams();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (newsId) getSingleNews();
  }, [newsId]);

  async function getSingleNews(id) {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:3001/news/${newsId}`);
      if (!response.ok) throw new Error("Failed to fetch single news");
      const data = await response.json();
      setSingleNews(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("ERROR ->", error);
    }
  }

  if (loading) {
    return <div className="loading-spinner"></div>;
  }

  return (
    <div>
      {singleNews ? (
        <div>
          <p>{singleNews.title}</p>
          <p>{singleNews.source}</p>
        </div>
      ) : (
        <span>Nema vest</span>
      )}
    </div>
  );
}
