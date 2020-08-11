import React from "react";
import {Edit,Delete} from '@material-ui/icons';

const News = ({news, handleNewsForm}) => {


  const openForm = () => {
    handleNewsForm(true)
  }

  const deleteNews = async() => {

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
    <div>
    <div className="lookup-action">
      <div className="lookup-edit" onClick={openForm} >
        <Edit />
      </div>
      <div className="lookup-delete">
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
