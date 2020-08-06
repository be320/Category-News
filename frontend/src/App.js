import React, { useEffect, useState } from 'react';
import './App.css';
import Category from './sideComponents/Category';
import axios from 'axios';
import CategoryForm from './sideComponents/CategoryForm'
import NewsForm from './sideComponents/NewsForm'

function App() {

  const [dump,setDump] = useState('');

  const data = [
    {
      "category": "Weather",
      "news": ["Hot","cold","windy"]
    },
    {
      "category": "Sports",
      "news": ["Wrestling","horses","swimming"]
    },
    {
      "category": "Weather",
      "news": ["Hot","cold","windy"]
    },
    {
      "category": "Sports",
      "news": ["Wrestling","horses","swimming"]
    },
    {
      "category": "Weather",
      "news": ["Hot","cold","windy"]
    },
    {
      "category": "Sports",
      "news": ["Wrestling","horses","swimming"]
    },
    {
      "category": "Weather",
      "news": ["Hot","cold","windy"]
    },
    {
      "category": "Sports",
      "news": ["Wrestling","horses","swimming"]
    },
    {
      "category": "Weather",
      "news": ["Hot","cold","windy"]
    },
    {
      "category": "Sports",
      "news": ["Wrestling","horses","swimming"]
    },
    {
      "category": "Weather",
      "news": ["Hot","cold","windy"]
    },
    {
      "category": "Sports",
      "news": ["Wrestling","horses","swimming"]
    },
  ]

  const load = async () => {
    const data = await axios.get('http://localhost/Category-News/backend/api/app.php');
    console.log(data.data)
    setDump(data.data)
  }

  useEffect(()=>{
    load()
  },[])

  return (
    <div className="container">
    <h1>Category News</h1>
    <div className="container-row">
    <div className="folder-structure">
      <h2>Categories</h2>
      <div className="category-scroll">
      {
        data.map((d,index)=>{
          return(
            <Category name={d.category} news={d.news} key={index}/>
          )
        })
      }
      </div>
    </div>
    <div className="category-container">
    <CategoryForm />
    </div>
    <div className="news-container">
    {/* <NewsForm /> */}
    </div>
    </div>
    </div>
  );
}

export default App;
