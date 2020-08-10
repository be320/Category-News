import React from "react";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Checkbox from "@material-ui/core/Checkbox";
import { TextField } from "@material-ui/core";
import { ArrowBackIosRounded, ArrowForwardIosRounded } from "@material-ui/icons";

const NewsForm = ({handleNewsForm}) => {
  const [state, setState] = React.useState({
    gilad: true,
    jason: false,
    antoine: false
  });

  const handleChange = event => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const close = () => {
    handleNewsForm(false)
  }

  const { gilad, jason, antoine } = state;
  const error = [gilad, jason, antoine].filter(v => v).length !== 2;

  return (
    <div className="category-form-container">
      <div className="category-form-body">
        <h2>News</h2>
        <TextField label="Title" />
        <TextField label="Description" />
        <TextField label="Image URL" />
        <TextField label="Author" />
        <TextField label="Link URL" />
        <div className="choose-categories">
          <FormControl component="fieldset">
            <FormLabel component="legend" style={{ color: "#c26c62" }}>
              Category
            </FormLabel>
            <FormGroup>
              <div className="choose-categories">
                <div className="arrow">
                  <ArrowBackIosRounded style={{ color: "black" }} />
                </div>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={gilad}
                      onChange={handleChange}
                      name="gilad"
                    />
                  }
                  label="Gilad Gray"
                  style={{ color: "#000" }}
                />
                <div className="arrow">
                  <ArrowForwardIosRounded style={{ color: "black" }} />
                </div>
              </div>
            </FormGroup>
            <FormHelperText style={{ color: "#000" }}>
              Select one at least
            </FormHelperText>
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

export default NewsForm;
