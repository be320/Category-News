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
  const [mainCategories, setMainCategories] = useState([]);
  const [showNewsForm, setShowNewsForm] = useState(false);
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [editCategoryForm, setEditCategoryForm] = useState(false);
  const [editNewsForm, setEditNewsForm] = useState(false);
  const [categoryTitle,setCategoryTitle] = useState("news");
  const [newsID,setNewsID] = useState("");
  const [news,setNews] = useState([]);
  const [showNewsDetails,setShowNewsDetails] = useState(false);

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

  const handleEditCategoryForm = (value) => {
    setEditCategoryForm(value);
  };

  const handleEditNewsForm = (value,id="") => {
    setEditNewsForm(value);
    setNewsID(id);
  };

  const loadNews = async() => {
    const response = await axios.get(
      "http://localhost/Category-News/backend/api/getNews.php", {
        params: {
          title: categoryTitle
        }
      }
    );
    console.log(response.data)
    setNews(response.data)
  }

  const load = async () => {
    const data = await axios.get(
      `http://localhost:8000/api/categories/news/family`
    );
    setMainCategories(data.data.children);
    console.log(data)
  };

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

  const RenderCategories = () => {
    if (mainCategories.length > 0) {
      return (
        mainCategories.map((d, index) => (
        <Category
          name={d["name"]}
          news={[]}
          key={index}
          handleEditCategoryForm={handleEditCategoryForm}
          handleCategoryTitle={handleCategoryTitle}
          load={load}
          loadNews={loadNews}
          handleShowNewsDetails={handleShowNewsDetails}
        />
      ))
      )
    } else {
      return <div></div>;
    }
  };

  useEffect(() => {
    loadNews();
    load();
  }, [categoryTitle]);

  return (
    <div className="container">
      <Header
        handleNewsForm={handleNewsForm}
        handleShowNewsDetails={handleShowNewsDetails}
        handleCategoryForm={handleCategoryForm}
        showNewsDetails={showNewsDetails}
      />
      {showNewsForm ? <NewsForm handleNewsForm={handleNewsForm} load={load} loadNews={loadNews} /> : <></>}
      {showCategoryForm ? (
        <CategoryForm handleCategoryForm={handleCategoryForm} load={load} loadNews={loadNews} handleCategoryTitle={handleCategoryTitle} />
      ) : (
        <></>
      )}
      {editCategoryForm ? (
        <EditCategoryForm handleEditCategoryForm={handleEditCategoryForm} load={load} loadNews={loadNews} categoryTitle={categoryTitle} handleCategoryTitle={handleCategoryTitle} />
      ) : (
        <></>
      )}
      {editNewsForm ? (
        <EditNewsForm handleEditNewsForm={handleEditNewsForm} load={load} loadNews={loadNews} newsID={newsID}  />
      ) : (
        <></>
      )}
      <div className="container-row">
        <div className="folder-structure">
          {/* <RenderCategories /> */}
        </div>
        { showNewsDetails? <NewsDetails newsID={newsID} />  : <div className="board">
          <Map handleEditCategoryForm={handleEditCategoryForm} handleCategoryTitle={handleCategoryTitle} categoryTitle={categoryTitle} load={load} loadNews={loadNews} />
          <div className="all-news">
          <RenderNews />
          </div>
        </div>}
      </div>
    </div>
  );
}

export default Board;
