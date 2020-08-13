import React, { useState, useEffect } from "react";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Checkbox from "@material-ui/core/Checkbox";
import { TextField } from "@material-ui/core";
import TinyEditor from '../sideComponents/TinyEditor';
import {
  ArrowBackIosRounded,
  ArrowForwardIosRounded
} from "@material-ui/icons";
import axios from "axios";

const NewsForm = ({ handleNewsForm,load,loadNews }) => {
  const [state, setState] = React.useState({});
  const [counter, setCounter] = useState(0);
  const [categories, setCategories] = useState([]);
  const [news,setNews] = useState({});


  const getCategories = async () => {
    const response = await axios.get(
      "http://localhost/Category-News/backend/api/getCategories.php"
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
      news: news
    }

   const response = await axios.post(
    "http://localhost/Category-News/backend/api/createNews.php",data
  );
  
  console.log(response.data);

  handleNewsForm(false);
  load();
  loadNews();

  }

  useEffect(() => {
    getCategories();
  },[]);


  return (
    <div className="news-form-container">
      <div className="news-form-body">
      <div className="news-form-details" >
        <h2>Add News</h2>
        <TextField label="Title" name="title" onChange={handleNews} />
        <TextField label="Description" name="description" onChange={handleNews} />
        <TextField label="Image URL" name="image" onChange={handleNews} />
        <TextField label="Author" name="author" onChange={handleNews} />
        <TextField label="Link URL" name="link" onChange={handleNews} />
        <FormLabel component="legend" style={{ color: "#c26c62",marginTop:"20px",marginBottom:"20px" }}>
              Content
            </FormLabel>
        <TinyEditor />
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
