import React, { useEffect, useState } from 'react';
import './App.css';
import Category from './sideComponents/Category';
import News from './sideComponents/News';
import axios from 'axios';

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
      <Category />
      <News />
    </div>
    <div className="category-container">

    </div>
    <div className="news-container">

    </div>
    </div>
    </div>
  );
}

export default App;
