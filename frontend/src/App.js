import React, { useEffect, useState } from 'react';
import './App.css';
import Category from './sideComponents/Category';
import axios from 'axios';
import Header from './sideComponents/Header';
import Map from './sideComponents/Map';
import News from './sideComponents/News';

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
    }
  ]

  const load = async () => {
    const data = await axios.get('http://localhost/Category-News/backend/api/app.php');
    console.log(data.data)
    setDump(data.data)
  }

  const createCategory = async() => {
    await axios.post('http://localhost/Category-News/backend/api/app.php')
  }

  useEffect(()=>{
    load()
  },[])

  return (
    <div className="container">
    <Header />
    <div className="container-row">
    <div className="folder-structure">
      {
        data.map((d,index)=>{
          return(
            <Category name={d.category} news={d.news} key={index}/>
          )
        })
      }
    </div>
    <div className="board">
    <Map />
    <div className="all-news">
    <News />
    <News />
    <News />
    <News />
    <News />
    </div>
    </div>
    </div>
    </div>
  );
}

export default App;
