import React from "react";
import {Add,Folder,FolderOpen,Description} from '@material-ui/icons';

const News = () => {
  return (
    <div className="news-row">
    
      <div className="lookup">
        <Description />
      </div>
      <div className="lookup">
        <p>Weather</p>
      </div>
    </div>
  );
};

export default News;
