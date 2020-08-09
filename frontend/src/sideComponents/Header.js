import React from 'react';

const Header = () => {

    return(
        <div className="header-container">
            <h1>Croco News</h1>
            <div className="header-buttons">
                <div className="add-category-button">
                    + Add Category
                </div>
                <div className="add-news-button">
                    + Add News
                </div>
            </div>
        </div>
    );

}

export default Header;