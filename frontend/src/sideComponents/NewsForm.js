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

const NewsForm = ({ handleNewsForm,handleCategoryTitle }) => {
  const [state, setState] = React.useState({});
  const [counter, setCounter] = useState(0);
  const [categories, setCategories] = useState([]);
  const [news,setNews] = useState({});
  const [logo,setLogo] = useState("");
  const [image,setImage] = useState("");
  const [content,setContent] = useState("");

  const getCategories = async () => {
    const response = await axios.get(
      "http://localhost:8000/api/categories"
    );
    setCategories(response.data);
    const data = response.data;
    var arr = {};
    data.map((d)=>{
      arr = {...arr,[d.name]:false}
    })
    setState(arr)
  };

  const handleChange = event => {
    setState({ ...state, [event.target.name]: event.target.checked });
    
  };

  const changeTitle = (value) => {
    handleCategoryTitle(value)
  }

  const handleCounter = value => {
    if (value < 0) value = categories.length - 1;
    else if (value === categories.length) value = 0;
    setCounter(value);
  };

  const increment = () => {
    handleCounter(counter + 1);
  }; 

  const decrement = () => {
    handleCounter(counter - 1);
  };


  const RenderCategories = () => {
    if (categories.length > 0) {
      return (
        <FormControlLabel
          control={
            <Checkbox checked={state[categories[counter].name]} onChange={handleChange} name={categories[counter].name} />
          }
          label={categories[counter].name}
          style={{ color: "#000" }}
        />
      );
    } else {
      return <></>;
    }
  };

  const close = () => {
    handleNewsForm(false);
  };

  const handleNews = (event) => {
    setNews({ ...news, [event.target.name]: event.target.value });
  }

  const createNews = async() => {
    var chosen=[];
    categories.map((cat,index)=>{
      if(state[cat.name])
        chosen.push(cat.name)
    })

    const data = {
      categories: chosen,
      news: news,
      content: content,
      image: image
    }

    console.log(data)
    
   const response = await axios.post(
    "http://localhost:8000/api/news",data
  );
  console.log(response);
  changeTitle("news");
  handleNewsForm(false);
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
        <FeaturedPlayList fontSize="large" style={{color:'#fff',marginTop:'60px',marginLeft:'40px'}}/>
          )
    }
  
  }

  const handleContent = (value) => {
    setContent(value)
  }

  useEffect(() => {
    getCategories();
  },[]);


  return (
    <div className="news-form-container">
      <div className="news-form-body">
      <div className="news-form-details" >
        <h2>Add News</h2>


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
        <TextField label="Title" name="title" onChange={handleNews} />
        <TextField label="Description" name="description" onChange={handleNews} />
        <TextField label="Author" name="author" onChange={handleNews} />
        <TextField label="Link URL" name="link" onChange={handleNews} />
        <FormLabel component="legend" style={{ color: "#c26c62",marginTop:"20px",marginBottom:"20px" }}>
              Content
            </FormLabel>
        <TinyEditor  handleContent={handleContent} />
        <div className="choose-categories">
          <FormControl component="fieldset">
            <FormLabel component="legend" style={{ color: "#c26c62" }}>
              Category
            </FormLabel>
            <FormGroup>
              <div className="choose-categories">
                <div className="arrow" onClick={decrement} >
                  <ArrowBackIosRounded style={{ color: "black" }} />
                </div>

                <RenderCategories />

                <div className="arrow" onClick={increment} >
                  <ArrowForwardIosRounded style={{ color: "black" }} />
                </div>
              </div>
            </FormGroup>
          </FormControl>
        </div>
        <div className="form-category-buttons">
          <div className="form-category-add" onClick={createNews} >Save</div>
          <div className="form-category-cancel" onClick={close}>
            Cancel
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default NewsForm;
