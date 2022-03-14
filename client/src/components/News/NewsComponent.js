import React, { useState, useEffect } from "react";
import axios from "axios";
import NewsCard from "./NewsCard.js";
import { Container, LinearProgress } from "@material-ui/core";

const NewsComponent = ({ market }) => {
  const [news, setNews] = useState([]);

  const fetchNews = async () => {
    const news = await axios.get("http://localhost:5000/news/trending");
    console.log(news.data);
    setNews(news.data);
  };

  useEffect(() => {
    fetchNews();
  }, []);
  if (!news.length > 0)
    return <LinearProgress style={{ background: "gold" }} />;

  return (
    <div
      className="home-heading-container"
      style={{ marginTop: "4%", paddingLeft: "2%" }}
    >
      {news.length > 0 && <NewsCard data={news} />}
    </div>
  );
};

export default NewsComponent;
