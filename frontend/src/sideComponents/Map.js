import React from 'react';
import {FeaturedPlayList} from '@material-ui/icons'
const Map = () => {

    return(
        <div className="map-container">
        <div className="map-head">
        <div >
        <FeaturedPlayList fontSize="large" />
        </div>
        <div className="selected-category">Weather</div>
        </div>
        <div className="map-tree">
        Movies > Tragedy > 2019 > Cristopher > Oscars
        </div>
        <div className="map-subcategories">
        <p>SAW</p>
        <p>SFSFJ</p>
        <p>MovDFSDFie</p>
        </div>
        </div>
    )

}

export default Map