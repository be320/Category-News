import React,{useState} from 'react';
import {KeyboardArrowRight,KeyboardArrowDown,Folder,FolderOpen,Edit,Delete} from '@material-ui/icons'
import News from './News'

const Category = ({name,news}) => {

    const [open,setOpen] = useState(false)

    const clicked = () =>{
        setOpen(!open)
    }

    return(
    <div> 
    <div className="category-row" onClick={clicked}>
    <div className="lookup" >
       { open?   <KeyboardArrowDown />: <KeyboardArrowRight/>}
    </div>
    <div className="lookup">
    { open?   <FolderOpen />: <Folder/>}
    </div>
    <div className="lookup">
        <p>{name}</p>
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
        {
            open? (news.map((n,index)=>{
                return(
                    <News key={index} name={n} />
                )
            })) : <div></div>
        }
    </div>   
    )
    
}

export default Category;