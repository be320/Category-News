import React from 'react';

const Header = ({handleNewsForm,handleCategoryForm,handleShowNewsDetails,showNewsDetails}) => {

    const showNews = () => {
        handleNewsForm(true)
    }

    const backHome = () => {
        handleShowNewsDetails(false);
    }

    const showCategory = () => {
        handleCategoryForm(true)
    }

    return(
        <div className="header-container">
            <h1 onClick={backHome} >Croco News</h1>
            { showNewsDetails? 
            <div className="header-buttons"> 
            <div className="add-category-button" onClick={backHome} >
                    Back to Board
            </div>
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