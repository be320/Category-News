import React from "react";
import {Edit,Delete} from '@material-ui/icons';
import axios from 'axios';

const News = ({news, handleEditNewsForm,loadNews}) => {


  const openForm = () => {
    handleEditNewsForm(true,news.title)
  }

  const deleteNews = async() => {

    const data = {
      title: news.title
    }
    const response = await axios.post("http://localhost/Category-News/backend/api/deleteNews.php",
      data);
      console.log(response)
      loadNews();
  }

  return (
   
    <div className="news-container">
    <div className="news-row">
    <a href={news.link} style={{textDecoration:"none",color:"white"}}>
    <div className="news-body">
    <div className="news-title">
    {news.title}
    </div>
    <div className="news-author">
    {news.author}
    </div>
    <div className="news-description">
   {news.description}
    </div>
    </div>
    </a>
    <div className="left-news">
    <div className="lookup-action">
      <div className="lookup-edit" onClick={openForm} >
        <Edit />
      </div>
      <div className="lookup-delete" onClick={deleteNews} >
        <Delete />
      </div>
      </div>
    <img className="news-image" src={news.image} alt="samsung" width="120px" height="120px"/>
    </div>
    </div>
    </div>
    
  );
};

export default News;
