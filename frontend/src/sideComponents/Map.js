import React, { useState, useEffect } from 'react';
import {FeaturedPlayList} from '@material-ui/icons'
import {Edit,Delete} from '@material-ui/icons';
import axios from "axios";
const Map = ({handleEditCategoryForm, handleCategoryTitle,categoryTitle,load,loadNews}) => {

    const [children,setChildren] = useState([]);
    const [parents, setParents] = useState([])

    const openForm = () => {
      handleEditCategoryForm(true)
      }

    const changeTitle = (value) => {
      handleCategoryTitle(value)
    }

    const deleteCategory = async() =>{
      const data = {
        name: categoryTitle
      }
      const response = await axios.post("http://localhost/Category-News/backend/api/deleteCategory.php",
      data);
      console.log(response)
      changeTitle("news")
      load();
    }



      const loadTitle = async () => {
        const data = await axios.get(
          "http://localhost/Category-News/backend/api/getParentPath.php", {
            params: {
              name: categoryTitle
            }
          }
        );
        setChildren(data.data.children)
        setParents(data.data.parents)
      }

      const RenderChildren = () => {
        if (children.length > 0) {
          return (
            children.map((d, index) => (
              <p className="subcategory" onClick={()=>changeTitle(d['name'])} >{d['name']}</p>
          ))
          )
        } else {
          return <div></div>;
        }
      }

      const RenderParents = () => {
        if (parents.length > 0) {
          return (
            parents.map((d, index) => (
              <p className="category-parent" onClick={()=>changeTitle(d['name'])} > > {d['name']}</p>
          ))
          )
        } else {
          return <div></div>;
        }
      }

      useEffect(()=>{
        loadTitle();
      },[categoryTitle])
    return(
        <div className="map-container">
        <div className="map-head">
        <div >
        <FeaturedPlayList fontSize="large" />
        </div>
        <div className="selected-category">{categoryTitle}</div>
        {
          categoryTitle !=="news" ? <div className="lookup-action">
        
        <div className="lookup-edit" onClick={openForm} >
          <Edit />
        </div>
        <div className="lookup-delete" onClick={deleteCategory} >
          <Delete />
        </div>
        </div>  :  <></>
        }
        
        </div>
        <div className="map-tree">
        <RenderParents />
        </div>
        <div className="map-subcategories">
        <RenderChildren />
        </div>
        </div>
    )

}

export default Map