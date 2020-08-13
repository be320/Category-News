import React, { useState, useEffect } from 'react';
import axios from "axios";
import TinyEditor from '../sideComponents/TinyEditor';
import Header from "../sideComponents/Header";

const NewsDetails = ({newsID}) => {

    const [news,setNews] = useState({});

    const load = async() => {
        const data = await axios.get(
            "http://localhost/Category-News/backend/api/getSingleNews.php", {
              params: {
                id: newsID
              }
            }
          );
          setNews(data.data);
          console.log(data.data)
    }

    useEffect(()=>{
        load();
    },[])

    return(
       <TinyEditor />
    )

}

export default NewsDetails;