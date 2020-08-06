import React from "react";
import {Add,Folder,FolderOpen,Description,Edit,Delete} from '@material-ui/icons';

const News = ({name}) => {
  return (
    <div className="news-row">
    
      <div className="lookup">
        <Description />
      </div>
      <div className="lookup">
        {name}
      </div>
      <div className="lookup-action">
      <div className="lookup-edit">
        <Edit />
      </div>
      <div className="lookup-delete">
        <Delete />
      </div>
      </div>
      
    </div>
  );
};

export default News;
