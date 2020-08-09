import React from 'react'
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
import { TextField } from '@material-ui/core';

const NewsForm = () => {

    const [state, setState] = React.useState({
        gilad: true,
        jason: false,
        antoine: false,
      });

      const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
      };
    
      const { gilad, jason, antoine } = state;
      const error = [gilad, jason, antoine].filter((v) => v).length !== 2;

    return(
        <div className="category-form-container">
        <div className="category-form-body">
           <h2>Add News</h2> 
           <TextField  label="Title" />
           <TextField  label="Description" />
           <TextField  label="Image URL" />
           <TextField  label="Author" />
           <TextField  label="Link URL" />
           <div className="choose-categories">

        <FormControl component="fieldset">
        <FormLabel component="legend" style={{color:'#c26c62'}}>Category</FormLabel>
        <FormGroup className="select-category-scroll">
          <FormControlLabel
            control={<Checkbox checked={gilad} onChange={handleChange} name="gilad" />}
            label="Gilad Gray"
            style={{color:'#000'}}
          />
        </FormGroup>
        <FormHelperText style={{color:"#000"}} >Select one at least</FormHelperText>
      </FormControl>

           </div>
           <div className="form-category-buttons">
        <div className="form-category-add">Add News</div>
        <div className="form-category-cancel">Cancel</div>
        </div>
           </div>
        </div>
    )

}

export default NewsForm;