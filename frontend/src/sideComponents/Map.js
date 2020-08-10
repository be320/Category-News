import React, { useState, useEffect } from 'react';
import {FeaturedPlayList} from '@material-ui/icons'
import {Edit,Delete} from '@material-ui/icons';
import axios from "axios";
const Map = ({handleCategoryForm, handleCategoryTitle,categoryTitle}) => {

    const [children,setChildren] = useState([]);
    const [parents, setParents] = useState([])

    const openForm = () => {
        handleCategoryForm(true)
      }

    const changeTitle = (value) => {
      handleCategoryTitle(value)
    }


      const load = async () => {
        const data = await axios.get(
          "http://localhost/Category-News/backend/api/getParentPath.php", {
            params: {
              name: categoryTitle
            }
          }
        );
        console.log(data.data)
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
        load();
      },[categoryTitle])
    return(
        <div className="map-container">
        <div className="map-head">
        <div >
        <FeaturedPlayList fontSize="large" />
        </div>
        <div className="selected-category">{categoryTitle}</div>
        <div className="lookup-action">
      <div className="lookup-edit" onClick={openForm} >
        <Edit />
      </div>
      <div className="lookup-delete">
        <Delete />
      </div>
      </div>
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