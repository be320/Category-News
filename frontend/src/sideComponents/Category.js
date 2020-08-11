import React,{useState} from 'react';
import {Book,Edit,Delete} from '@material-ui/icons'
import News from './News'
import axios from 'axios';

const Category = ({name,handleCategoryForm,handleCategoryTitle}) => {

    const openForm = () => {
      handleCategoryForm(true)
    }

    const changeTitle = (value) => {
      handleCategoryTitle(value)
    }

    const deleteCategory = async() =>{
      const data = {
        name: name
      }
      const response = await axios.post("http://localhost/Category-News/backend/api/deleteCategory.php",
      data);
      console.log(response)
    }

    return(
    <div> 
    <div className="category-row" onClick={()=>changeTitle(name)}>
    <div className="lookup">
    <Book />
    </div>
    <div className="lookup">
        <p>{name}</p>
    </div>
    <div className="lookup-action">
      <div className="lookup-edit" onClick={openForm} >
        <Edit />
      </div>
      <div className="lookup-delete" onClick={deleteCategory} >
        <Delete />
      </div>
      </div>
    </div>
    </div>   
    )
    
}

export default Category;