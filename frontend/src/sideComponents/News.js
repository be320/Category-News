import React from "react";
import {Edit,Delete} from '@material-ui/icons';
import axios from 'axios';

const News = ({news, handleEditNewsForm,loadNews, handleShowNewsDetails, handleNewsID,categoryTitle}) => {


  const openForm = () => {
    handleEditNewsForm(true,news.id)
  }

  const openDetails = () => {
     handleNewsID(news.id);
     handleShowNewsDetails(true)
  }

  const deleteNews = async() => {

    const data = {
      title: news.title
    }
    const response = await axios.delete(`http://localhost:8000/api/news/${news.id}`);
      console.log(response)
      loadNews();
  }

  return (
   
    <div className="news-container">
    <div className="news-row">
    <a href={'/category/'+categoryTitle+'/news/'+news.id}>
    <div className="news-body" onClick={openDetails} >
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
    <img className="news-image" src={'data:image/*;base64, ' + news.image} alt="samsung" width="120px" height="120px"/>
    </div>
    </div>
    </div>
    
  );
};

export default News;
