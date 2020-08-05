import React from 'react';
import {Add,Folder,FolderOpen} from '@material-ui/icons'

const Category = () => {
    return(
    <div> 
    <div className="category-row">
    <div className="lookup">
        <Add/>
    </div>
    <div className="lookup">
        <Folder/>
    </div>
    <div className="lookup">
        <p>Weather</p>
    </div>
    
    </div>
    </div>   
    )
    
}

export default Category;