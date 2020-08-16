import React, { useEffect, useState } from "react";
import Category from "../sideComponents/Category";
import axios from "axios";
import Header from "../sideComponents/Header";
import Map from "../sideComponents/Map";
import News from "../sideComponents/News";
import CategoryForm from "../sideComponents/CategoryForm";
import NewsForm from "../sideComponents/NewsForm";
import EditCategoryForm from '../sideComponents/EditCategoryForm';
import EditNewsForm from '../sideComponents/EditNewsForm';
import NewsDetails from './NewsDetails';

const Board = () => {
  const [showNewsForm, setShowNewsForm] = useState(false);
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [editCategoryForm, setEditCategoryForm] = useState(false);
  const [editNewsForm, setEditNewsForm] = useState(false);
  const [categoryTitle,setCategoryTitle] = useState("news");
  const [newsID,setNewsID] = useState("");
  const [news,setNews] = useState([]);
  const [showNewsDetails,setShowNewsDetails] = useState(false);
  const [categoryID,setCategoryID] = useState(0);

  const handleCategoryTitle = (title) => {
    setCategoryTitle(title)
  }

  const handleShowNewsDetails = (value) => {
    setShowNewsDetails(value);
  }

  const handleNewsID = (id) => {
    setNewsID(id)
  }

  const handleNewsForm = value => {
    setShowNewsForm(value);
  };

  const handleCategoryForm = value => {
    setShowCategoryForm(value);
  };

  const handleEditCategoryForm = (value,id="") => {
    setEditCategoryForm(value);
    setCategoryID(id);
  };

  const handleEditNewsForm = (value,id="") => {
    setEditNewsForm(value);
    setNewsID(id);
  };

  const loadNews = async() => {
    const response = await axios.get(
      `http://localhost:8000/api/categories/${categoryTitle}/news`);
    console.log(response.data.news)
    setNews(response.data.news)
  }

  // const load = async () => {
  //   const data = await axios.get(
  //     `http://localhost:8000/api/categories/news/family`
  //   );
  //   setMainCategories(data.data.children);
  //   console.log(data)
  // };

  const RenderNews = () => {
    if (news.length > 0) {
      return (
        news.map((n, index) => (
          <News handleEditNewsForm={handleEditNewsForm} news={n} loadNews={loadNews} handleNewsID={handleNewsID} handleShowNewsDetails={handleShowNewsDetails} />
      ))
      )
    } else {
      return <div></div>;
    }
  }

 

  useEffect(() => {
    setNews([]);
    loadNews();
  }, [categoryTitle]);

  return (
    <div className="container">
      <Header
        handleNewsForm={handleNewsForm}
        handleShowNewsDetails={handleShowNewsDetails}
        handleCategoryForm={handleCategoryForm}
        showNewsDetails={showNewsDetails}
      />
      {showNewsForm ? <NewsForm handleNewsForm={handleNewsForm} handleCategoryTitle={handleCategoryTitle} /> : <></>}
      {showCategoryForm ? (
        <CategoryForm handleCategoryForm={handleCategoryForm} handleCategoryTitle={handleCategoryTitle} />
      ) : (
        <></>
      )}
      {editCategoryForm ? (
        <EditCategoryForm handleEditCategoryForm={handleEditCategoryForm} categoryTitle={categoryTitle} handleCategoryTitle={handleCategoryTitle} categoryID={categoryID} />
      ) : (
        <></>
      )}
      {editNewsForm ? (
        <EditNewsForm handleEditNewsForm={handleEditNewsForm} handleCategoryTitle={handleCategoryTitle} newsID={newsID}  />
      ) : (
        <></>
      )}
      <div className="container-row">
        <div className="folder-structure">
          {/* <RenderCategories /> */}
        </div>
        { showNewsDetails? <NewsDetails newsID={newsID} />  : <div className="board">
          <Map handleEditCategoryForm={handleEditCategoryForm} handleCategoryTitle={handleCategoryTitle} categoryTitle={categoryTitle} />
          <div className="all-news">
          <RenderNews />
          </div>
        </div>}
      </div>
    </div>
  );
}

export default Board;
