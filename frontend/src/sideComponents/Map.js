import React from 'react';
import {FeaturedPlayList} from '@material-ui/icons'
import {Edit,Delete} from '@material-ui/icons';
const Map = ({handleCategoryForm}) => {
    const openForm = () => {
        handleCategoryForm(true)
      }
    return(
        <div className="map-container">
        <div className="map-head">
        <div >
        <FeaturedPlayList fontSize="large" />
        </div>
        <div className="selected-category">Weather</div>
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
        Movies > Tragedy > 2019 > Cristopher > Oscars
        </div>
        <div className="map-subcategories">
        <p className="subcategory">SAW</p>
        <p className="subcategory">SAW</p>
        <p className="subcategory">SAW</p>
        <p className="subcategory">SAW</p>
        <p className="subcategory">SAW</p>
        <p className="subcategory">SAW</p>
        <p className="subcategory">SAW</p>
        <p className="subcategory">SAW</p>
        <p className="subcategory">SAW</p>
        <p className="subcategory">SAW</p>
        <p className="subcategory">SAW</p>
        <p className="subcategory">SAW</p>
        <p className="subcategory">SAW</p>
        <p className="subcategory">SAW</p>
        </div>
        </div>
    )

}

export default Map