import React, { useEffect, useState } from 'react';
import './App.css';
import Category from './sideComponents/Category';
import axios from 'axios';
import Header from './sideComponents/Header';
import Map from './sideComponents/Map';
import News from './sideComponents/News';
import CategoryForm from './sideComponents/CategoryForm';
import NewsForm from './sideComponents/NewsForm';

function App() {

  const [mainCategories,setMainCategories] = useState([]);
  const [showNewsForm,setShowNewsForm] = useState(false);
  const [showCategoryForm,setShowCategoryForm] = useState(false);

  const data = [
    {
      "category": "Weather",
      "news": ["Hot","cold","windy"]
    },
    {
      "category": "Sports",
      "news": ["Wrestling","horses","swimming"]
    }
  ]

  const handleNewsForm = (value) => {
    setShowNewsForm(value)
  }

  const handleCategoryForm = (value) => {
    setShowCategoryForm(value)
  }

  const load = async () => {
    const data = await axios.get('http://localhost/Category-News/backend/api/getMainCategories.php');
    console.log(data.data)
    setMainCategories(data.data)
  }

  const createCategory = async() => {
    const category = {
      "name": "Sports",
      "parent_id": 1
    }

   const response =  await axios.post('http://localhost/Category-News/backend/api/createCategory.php',category);
   console.log(response);
  }

  useEffect(()=>{
    load()
  },[])

  return (
    <div className="container">
    <Header  handleNewsForm={handleNewsForm}  handleCategoryForm={handleCategoryForm} /> 
    { showNewsForm? <NewsForm handleNewsForm={handleNewsForm} /> : <></>}
    { showCategoryForm? <CategoryForm handleCategoryForm={handleCategoryForm} />: <></>}
    <div className="container-row">
    <div className="folder-structure">
      {
        data.map((d,index)=>{
          return(
            <Category name={d.category} news={d.news} key={index} handleCategoryForm={handleCategoryForm}  />
          )
        })
      }
    </div>
    <div className="board">
    <Map handleCategoryForm={handleCategoryForm} />
    <div className="all-news">
    <News  handleNewsForm={handleNewsForm} />
    </div>
    </div>
    </div>
    </div>
  );
}

export default App;
