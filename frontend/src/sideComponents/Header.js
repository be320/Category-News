import React from 'react';

const Header = ({handleNewsForm,handleCategoryForm,handleShowNewsDetails,showNewsDetails}) => {

    const showNews = () => {
        handleNewsForm(true)
    }


    const showCategory = () => {
        handleCategoryForm(true)
    }

    return(
        <div className="header-container">
          <a href='/'>  <h1 >Croco News</h1> </a>
            { showNewsDetails? 
            <div className="header-buttons"> 
            </div> : <div className="header-buttons">
                <div className="add-category-button" onClick={showCategory} >
                    + Add Category
                </div>
                <div className="add-news-button" onClick={showNews} >
                    + Add News
                </div>
            </div>}
        </div>
    );

}

export default Header;