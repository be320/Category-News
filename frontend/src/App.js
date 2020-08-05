import React, { useEffect, useState } from 'react';
import './App.css';
import Category from './sideComponents/Category';
import News from './sideComponents/News';
import axios from 'axios';
import CategoryForm from './sideComponents/CategoryForm'
import NewsForm from './sideComponents/NewsForm'

function App() {

  const [dump,setDump] = useState('');

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
      <h3>Categories</h3>
      <Category />
      <News />
      <News />
      <News />
      <Category />
      <News />
      <News />
      <News />
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
