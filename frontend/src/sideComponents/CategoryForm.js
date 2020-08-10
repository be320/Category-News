import React from "react";
import { TextField } from "@material-ui/core";
import { ArrowBackIosRounded, ArrowForwardIosRounded } from "@material-ui/icons";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

const CategoryForm = ({handleCategoryForm}) => {
  const [value, setValue] = React.useState("female");

  const handleChange = event => {
    setValue(event.target.value);
  };

  const close = () => {
    handleCategoryForm(false)
  }

  return (
    <div className="category-form-container">
      <div className="category-form-body">
        <h2>Category</h2>
        <TextField label="Category Name" />
        <div className="parent-category-body">
          <FormLabel component="legend" style={{ color: "#c26c62" }}>
            Belongs To
          </FormLabel>
          <FormControl component="fieldset">
            <RadioGroup
              aria-label="gender"
              name="gender1"
              value={value}
              onChange={handleChange}
            >
            <div className="choose-categories">
            <div className="arrow">
                  <ArrowBackIosRounded style={{ color: "black" }} />
                </div>
                <FormControlLabel style={{ color: "black" }} value="male" control={<Radio />} label="Male" />
                <div className="arrow">
                  <ArrowForwardIosRounded style={{ color: "black" }} />
                </div>
            </div>
             
            </RadioGroup>
          </FormControl>
        </div>
        <div className="form-category-buttons">
          <div className="form-category-add">Save</div>
          <div className="form-category-cancel" onClick={close} >Cancel</div>
        </div>
      </div>
    </div>
  );
};

export default CategoryForm;
