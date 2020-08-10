import React from 'react';

const Header = ({handleNewsForm,handleCategoryForm}) => {

    const showNews = () => {
        handleNewsForm(true)
    }

    const showCategory = () => {
        handleCategoryForm(true)
    }

    return(
        <div className="header-container">
            <h1>Croco News</h1>
            <div className="header-buttons">
                <div className="add-category-button" onClick={showCategory} >
                    + Add Category
                </div>
                <div className="add-news-button" onClick={showNews} >
                    + Add News
                </div>
            </div>
        </div>
    );

}

export default Header;