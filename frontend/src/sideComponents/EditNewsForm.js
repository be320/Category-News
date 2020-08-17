import React, { useState, useEffect } from "react";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { TextField } from "@material-ui/core";
import TinyEditor from '../sideComponents/TinyEditor';
import { Button } from 'react-bootstrap';
import {FeaturedPlayList} from '@material-ui/icons'
import AddCircleOutline from '@material-ui/icons/AddCircleOutline';
import {
  ArrowBackIosRounded,
  ArrowForwardIosRounded
} from "@material-ui/icons";
import axios from "axios";
const fileUpload = require('fuctbase64');
let fileInput = null

const EditNewsForm = ({ handleEditNewsForm,newsID,handleCategoryTitle }) => {
  const [news,setNews] = useState({});
  const [logo,setLogo] = useState("");
  const [image,setImage] = useState("");
  const [content,setContent] = useState("");

  const close = () => {
    handleEditNewsForm(false);
  };

  const handleNews = (event) => {
    setNews({ ...news, [event.target.name]: event.target.value });
  }

  const loadOldData = async() => {
    const data = await axios.get(
      `http://localhost:8000/api/news/${newsID}`);
    const response = data.data.data;
    setNews({
      title: response.title,
      description: response.description,
      author: response.author,
      link: response.link
    });
    setImage(response.image)
    setContent(response.content)
    console.log(data.data.data);
  }

  const editNews = async() => {

    const data = {
      news: news,
      content: content,
      image: image,
      id: newsID
    }

    console.log(data)
    
   const response = await axios.put(
    `http://localhost:8000/api/news/${newsID}`,
    data
  );
  console.log(response);

  changeTitle("news");
  handleEditNewsForm(false);
  }

  const onDrop = async (picture,e) => {
    if(picture){
    setLogo(URL.createObjectURL(picture))
    imageEncoder(e)
    }
  }

  const imageEncoder = (event) => 
{
    fileUpload(event)
    .then((data) => {
            setImage(data.base64);
    })
}

  const RenderImage = () =>{
    if(logo)
    {
      return(
        <img src={logo} alt="logo" style={{ maxWidth: '150px',maxHeight: '150px',marginLeft:'20px',marginTop:'10px'}}/>
        )
    }
    else{
      return(
        <img src={"data:image/*;base64, " + image} alt="logo" style={{ maxWidth: '150px',maxHeight: '150px',marginLeft:'20px',marginTop:'10px'}}/>
          )
    }
  
  }

  const handleContent = (value) => {
    setContent(value)
  }

  const changeTitle = (value) => {
    handleCategoryTitle(value)
  }

  useEffect(() => {
    loadOldData();
  },[]);


  return (
    <div className="news-form-container">
      <div className="news-form-body">
      <div className="news-form-details" >
        <h2>Edit News</h2>


        <div className="logo" style={{backgroundColor:"#c3c3c9"}}>			
           <div className = "image-container">
		   <RenderImage />
		   </div>
		   <input
			type="file" style={{display:'none'}}
			 onChange={ (e) => onDrop(e.target.files[0],e) }
			 ref={input => (fileInput = input)} />
		   <Button onClick={()=>fileInput.click()} className="add-image-btn"  >
			   <AddCircleOutline style={{color:'#fff',fontSize:'30px'}}/> 
		   </Button>
            </div>
        <TextField name="title" onChange={handleNews} value={news.title} placeholder="Title" />
        <TextField placeholder="Description" name="description" onChange={handleNews} value={news.description} />
        <TextField placeholder="Author" name="author" onChange={handleNews} value={news.author} />
        <TextField placeholder="Link URL" name="link" onChange={handleNews} value={news.link} />
        <FormLabel component="legend" style={{ color: "#c26c62",marginTop:"20px",marginBottom:"20px" }}>
              Content
            </FormLabel>
        {content? <TinyEditor  handleContent={handleContent} oldContent={content} /> : <></>}
        <div className="form-category-buttons">
          <div className="form-category-add" onClick={editNews} >Save</div>
          <div className="form-category-cancel" onClick={close}>
            Cancel
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default EditNewsForm;
