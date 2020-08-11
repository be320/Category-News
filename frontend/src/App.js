import React, { useEffect, useState } from "react";
import "./App.css";
import Category from "./sideComponents/Category";
import axios from "axios";
import Header from "./sideComponents/Header";
import Map from "./sideComponents/Map";
import News from "./sideComponents/News";
import CategoryForm from "./sideComponents/CategoryForm";
import NewsForm from "./sideComponents/NewsForm";
import EditCategoryForm from './sideComponents/EditCategoryForm';
import EditNewsForm from './sideComponents/EditNewsForm';

function App() {
  const [mainCategories, setMainCategories] = useState([]);
  const [showNewsForm, setShowNewsForm] = useState(false);
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [editCategoryForm, setEditCategoryForm] = useState(false);
  const [editNewsForm, setEditNewsForm] = useState(false);
  const [categoryTitle,setCategoryTitle] = useState("news");
  const [newsTitle,setNewsTitle] = useState("");
  const [news,setNews] = useState([]);

  const handleCategoryTitle = (title) => {
    setCategoryTitle(title)
  }

  const handleNewsTitle = (title) => {
    setNewsTitle(title)
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

  const handleEditNewsForm = (value,name="") => {
    setEditNewsForm(value);
    setNewsTitle(name);
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
      "http://localhost/Category-News/backend/api/getNearChildCategories.php", {
        params: {
          name: "news"
        }
      }
    );
    setMainCategories(data.data);
  };

  const RenderNews = () => {
    if (news.length > 0) {
      return (
        news.map((n, index) => (
          <News handleEditNewsForm={handleEditNewsForm} news={n} loadNews={loadNews} handleNewsTitle={handleNewsTitle} />
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
        handleCategoryForm={handleCategoryForm}
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
        <EditNewsForm handleEditNewsForm={handleEditNewsForm} load={load} loadNews={loadNews} newsTitle={newsTitle}  />
      ) : (
        <></>
      )}
      <div className="container-row">
        <div className="folder-structure">
          <RenderCategories />
        </div>
        <div className="board">
          <Map handleEditCategoryForm={handleEditCategoryForm} handleCategoryTitle={handleCategoryTitle} categoryTitle={categoryTitle} load={load} loadNews={loadNews} />
          <div className="all-news">
          <RenderNews />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
