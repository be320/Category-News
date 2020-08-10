import React,{useState} from 'react';
import {Book,Edit,Delete} from '@material-ui/icons'
import News from './News'

const Category = ({name,handleCategoryForm,handleCategoryTitle}) => {

    const openForm = () => {
      handleCategoryForm(true)
    }

    const changeTitle = (value) => {
      handleCategoryTitle(value)
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
      <div className="lookup-delete">
        <Delete />
      </div>
      </div>
    </div>
    </div>   
    )
    
}

export default Category;