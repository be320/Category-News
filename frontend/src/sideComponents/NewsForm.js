import React from 'react'
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';

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
        <div className="news-form-container">
           <h2>Add News</h2> 
           <input placeholder="news" />
           <div className="choose-categories">

        <FormControl component="fieldset">
        <FormLabel component="legend" style={{color:'#c26c62'}}>Select Category</FormLabel>
        <FormGroup>
          <FormControlLabel
            control={<Checkbox checked={gilad} onChange={handleChange} name="gilad" />}
            label="Gilad Gray"
          />
        </FormGroup>
        <FormHelperText style={{color:"#fff"}} >Select one at least</FormHelperText>
      </FormControl>

           </div>
           <div className="add-category">
            Add News
           </div>
        </div>
    )

}

export default NewsForm;