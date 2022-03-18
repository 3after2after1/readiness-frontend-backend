import React, { useState, useEffect } from "react";
import axios from "axios";
import NewsCard from "./NewsCard.js";
import { Container, LinearProgress } from "@material-ui/core";
import { BACKEND_DOMAIN } from "../../api/backend";

const NewsComponent = ({ market }) => {
  const [news, setNews] = useState([]);

  const fetchNews = async () => {
    const news = await axios.get(`${BACKEND_DOMAIN}/news/trending`, {
      params: { market },
    });
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
      style={{ margin: "4% 0 1% 0", paddingLeft: "2%" }}
    >
      {news.length > 0 && <NewsCard data={news} />}
    </div>
  );
};

export default NewsComponent;
