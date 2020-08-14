import React, { useState, useEffect } from "react";
import axios from "axios";

const NewsDetails = ({ newsID }) => {
  const [news, setNews] = useState({});

  const load = async () => {
    const data = await axios.get(
      "http://localhost/Category-News/backend/api/getSingleNews.php",
      {
        params: {
          id: newsID
        }
      }
    );
    setNews(data.data);
    console.log(data.data);
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="news-details-container">
      {news ? (
        <div>
          <img
            className="news-details-image"
            src={"data:image/*;base64, " + news.image}
            alt="samsung"
            width="900px"
            height="600px"
          />
          <div className="news-details-title">{news.title}</div>
          <div className="news-details-content"
            dangerouslySetInnerHTML={{
              __html: news.content
            }}
          ></div>
           <div className="news-details-content">
             Copyrights to : {news.author}
           </div>
           <div className="news-details-content">
             For more information : <a href={news.link} alt ="link" >News Source</a>
           </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default NewsDetails;
