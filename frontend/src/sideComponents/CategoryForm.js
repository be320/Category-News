import React from "react";
import { TextField } from '@material-ui/core';

const CategoryForm = () => {
  return (
    <div className="category-form-container">
      <div className="category-form-body">
        <h2>Add Category</h2>
        <TextField  label="Category Name" />
        <div className="parent-category-body">
        <p>Belongs To</p>
        
        </div>
        <div className="form-category-buttons">
        <div className="form-category-add">Add Category</div>
        <div className="form-category-cancel">Cancel</div>
        </div>
      </div>
    </div>
  );
};

export default CategoryForm;
