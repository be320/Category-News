import React, { useState, useEffect } from 'react';
import {FeaturedPlayList} from '@material-ui/icons'
import {Edit,Delete} from '@material-ui/icons';
import axios from "axios";
const Map = ({handleEditCategoryForm, handleCategoryTitle,categoryTitle,load,loadNews}) => {

    const [children,setChildren] = useState([]);
    const [parents, setParents] = useState([]);
    const [categoryID,setCategoryID] = useState(0);

    const openForm = () => {
      handleEditCategoryForm(true,categoryID)
      }

    const changeTitle = (value) => {
      handleCategoryTitle(value)
    }

    const deleteCategory = async() =>{
      const response = await axios.delete(`http://localhost:8000/api/categories/${categoryID}`);
      console.log(response)
      changeTitle("news")
      load();
    }



      const loadTitle = async () => {
        const data = await axios.get(
          `http://localhost:8000/api/categories/${categoryTitle}/family`
        );
        setCategoryID(data.data.id);
        setChildren(data.data.children)
        setParents(data.data.ancestors)
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
        if (parents !== null) {
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