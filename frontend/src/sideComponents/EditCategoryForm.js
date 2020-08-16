import React, {useState} from "react";
import { TextField } from "@material-ui/core";
import axios from "axios";

const EditCategoryForm = ({ handleEditCategoryForm,load,categoryTitle,handleCategoryTitle,categoryID}) => {
  const [name, setName] = useState("");

  const changeTitle = (value) => {
    handleCategoryTitle(value)
  }


  const handleName = event => {
    setName(event.target.value);
  };

  const close = () => {
    handleEditCategoryForm(false);
  };


  const editCategory = async () => {
    const category = {
      name: name
    };
    const response = await axios.put(
      `http://localhost:8000/api/categories/${categoryID}`,
      category
    );
    console.log(response);
    handleEditCategoryForm(false);
    load();
    changeTitle(name)
  };

  return (
    <div className="category-form-container">
      <div className="category-form-body">
        <h2>Edit Category</h2>
        <TextField label="Category Name" onChange={handleName} />
        <div className="form-category-buttons">
          <div className="form-category-add" onClick={editCategory}>
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

export default EditCategoryForm;
