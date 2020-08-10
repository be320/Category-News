import React, { useEffect, useState } from "react";
import "./App.css";
import Category from "./sideComponents/Category";
import axios from "axios";
import Header from "./sideComponents/Header";
import Map from "./sideComponents/Map";
import News from "./sideComponents/News";
import CategoryForm from "./sideComponents/CategoryForm";
import NewsForm from "./sideComponents/NewsForm";

function App() {
  const [mainCategories, setMainCategories] = useState([]);
  const [showNewsForm, setShowNewsForm] = useState(false);
  const [showCategoryForm, setShowCategoryForm] = useState(false);

  const handleNewsForm = value => {
    setShowNewsForm(value);
  };

  const handleCategoryForm = value => {
    setShowCategoryForm(value);
  };

  const load = async () => {
    const data = await axios.get(
      "http://localhost/Category-News/backend/api/getNearChildCategories.php", {
        params: {
          name: "news"
        }
      }
    );
    console.log(data)
    setMainCategories(data.data);
  };

  const RenderCategories = () => {
    if (mainCategories.length > 0) {
      return (
        mainCategories.map((d, index) => (
        <Category
          name={d["name"]}
          news={[]}
          key={index}
          handleCategoryForm={handleCategoryForm}
        />
      ))
      )
    } else {
      return <div></div>;
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="container">
      <Header
        handleNewsForm={handleNewsForm}
        handleCategoryForm={handleCategoryForm}
      />
      {showNewsForm ? <NewsForm handleNewsForm={handleNewsForm} /> : <></>}
      {showCategoryForm ? (
        <CategoryForm handleCategoryForm={handleCategoryForm} />
      ) : (
        <></>
      )}
      <div className="container-row">
        <div className="folder-structure">
          <RenderCategories />
        </div>
        <div className="board">
          <Map handleCategoryForm={handleCategoryForm} />
          <div className="all-news">
            <News handleNewsForm={handleNewsForm} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
