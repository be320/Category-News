import React from "react";
import {Add,Folder,FolderOpen,Description} from '@material-ui/icons';

const News = ({name}) => {
  return (
    <div className="news-row">
    
      <div className="lookup">
        <Description />
      </div>
      <div className="lookup">
        {name}
      </div>
    </div>
  );
};

export default News;
