import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

export default function SingleNews() {
  const [singleNews, setSingleNews] = useState(null);
  const { newsId } = useParams();

  useEffect(() => {
    if (newsId) getSingleNews();
  }, [newsId]);

  async function getSingleNews(id) {
    try {
      const response = await fetch(`http://localhost:3001/news/${newsId}`); //prepravio umesto id newsId
      if (!response.ok) throw new Error("Failed to fetch single news");
      const data = await response.json();
      setSingleNews(data);
    } catch (error) {
      console.log("ERROR ->", error);
    }
  }

  return (
    <div>{singleNews ? <span>Ima vest</span> : <span>Nema vest</span>}</div>
  );
}
