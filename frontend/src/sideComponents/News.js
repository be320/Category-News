import React from "react";
import {Add,Folder,FolderOpen,Description,Edit,Delete} from '@material-ui/icons';

const News = ({name}) => {
  return (
    <div className="news-container">
    <div className="news-row">
    <div className="news-body">
    <div className="news-title">
    The Samsung Galaxy Note 20 and Note 20 Ultra are now available to pre-order on Amazon
    </div>
    <div className="news-author">
    Samsung ltd
    </div>
    <div className="news-description">
    ter months of speculation, leaks, and rumors, Samsung finally unveiled its latest flagships, the Galaxy Note 20 and Galaxy Note 20 Ultra, at its virtual unpacked event. These ultra-premium smartphones went up for pre-order yesterday at Samsung.com, and are now available for pre-order at other retailers including Amazon.com.

These new Notes both sport improvements to their cameras and S Pen functionality, and both come in some exciting new colors. The lower-priced Note 20 is available in a gorgeous new Mystic Green and a more standard Mystic Gray, while the Note 20 Ultra comes in a stunning Mystic Black and timeless Mystic White. The most sought-after color for each though, is likely to be the copper-toned Mystic Bronze.
These new Notes both sport improvements to their cameras and S Pen functionality, and both come in some exciting new colors. The lower-priced Note 20 is available in a gorgeous new Mystic Green and a more standard Mystic Gray, while the Note 20 Ultra comes in a stunning Mystic Black and timeless Mystic White. The most sought-after color for each though, is likely to be the copper-toned Mystic Bronze.
    </div>
    </div>
    <div>
    <div className="lookup-action">
      <div className="lookup-edit">
        <Edit />
      </div>
      <div className="lookup-delete">
        <Delete />
      </div>
      </div>
    <img className="news-image" src="https://drive.google.com/uc?id=1Pec0bcKsuPLZ_MDzH4lgqn1IhS_6UgGR" alt="samsung" width="120px" height="120px"/>
    </div>
    </div>
    </div>
  );
};

export default News;
