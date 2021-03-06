import React,{useState} from 'react';
import {Book,Edit,Delete} from '@material-ui/icons'
import News from './News'
import axios from 'axios';

const Category = ({name,handleEditCategoryForm,handleCategoryTitle,load,loadNews,handleShowNewsDetails}) => {

    const openForm = () => {
      handleEditCategoryForm(true)
    }

    const backHome = (value="") => {
      handleCategoryTitle(value==="" ? name:value)
      handleShowNewsDetails(false);
   }

    const deleteCategory = async() =>{
      const data = {
        name: name
      }
      const response = await axios.post("http://localhost/Category-News/backend/api/deleteCategory.php",
      data);
      console.log(response)
      backHome("news");
    }

    return(
    <div> 
     <div className="category-row" onClick={backHome} >
    <div className="category-row-body">
    <div className="lookup">
    <Book />
    </div>
    <div className="lookup">
        <p>{name}</p>
    </div>
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