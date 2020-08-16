import React, { useState, useEffect } from "react";
import { TextField } from "@material-ui/core";
import {
  ArrowBackIosRounded,
  ArrowForwardIosRounded
} from "@material-ui/icons";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import axios from "axios";

const CategoryForm = ({ handleCategoryForm,loadNews,load,handleCategoryTitle }) => {
  const [name, setName] = useState("");
  const [parentName, setParentName] = useState("news");
  const [categories, setCategories] = useState([]);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    getCategories();
  },[]);

  const getCategories = async () => {
    const response = await axios.get(
      "http://localhost:8000/api/categories"
    );
    setCategories(response.data);
    
   // console.log(response.data);
  };

  const handleName = event => {
    setName(event.target.value);
  };

  const changeTitle = (value) => {
    handleCategoryTitle(value)
  }


  const handleParent = event => {
    setParentName(event.target.value);
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

  const close = () => {
    handleCategoryForm(false);
  };

  const RenderCategory = () => {
    if(categories.length>0){
      return(
        <FormControlLabel
            style={{ color: "black" }}
            value={categories[counter].name}
            control={<Radio />}
            label={categories[counter].name}
          />
)
    }

    else{
      return (<></>)
    }
    
  }

  const createCategory = async () => {
    const category = {
      name: name,
      parent: parentName
    };
    const response = await axios.post(
      "http://localhost:8000/api/categories",
      category
    );
    console.log(response);
    load();
    changeTitle(name);
    handleCategoryForm(false);
  };

  return (
    <div className="category-form-container">
      <div className="category-form-body">
        <h2>Add Category</h2>
        <TextField label="Category Name" onChange={handleName} />
        <div className="parent-category-body">
          <FormLabel component="legend" style={{ color: "#c26c62" }}>
            Belongs To
          </FormLabel>
          <FormControl component="fieldset">
            <RadioGroup
              aria-label="parent"
              name="parent1"
              value={parentName}
              onChange={handleParent}
            >
              <div className="choose-categories">
                <div className="arrow" onClick={decrement}>
                  <ArrowBackIosRounded style={{ color: "black" }} />
                </div>
              
              <RenderCategory />

                <div className="arrow" onClick={increment}>
                  <ArrowForwardIosRounded style={{ color: "black" }} />
                </div>
              </div>
            </RadioGroup>
          </FormControl>
        </div>
        <div className="form-category-buttons">
          <div className="form-category-add" onClick={createCategory}>
            Save
          </div>
          <div className="form-category-cancel" onClick={close}>
            Cancel
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryForm;
