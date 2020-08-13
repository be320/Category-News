import React, { useState} from "react";
import { TextField } from "@material-ui/core";
import axios from "axios";

const EditNewsForm = ({
  handleEditNewsForm,
  load,
  loadNews,
  newsTitle
}) => {
  const [news, setNews] = useState({});

  const close = () => {
    handleEditNewsForm(false);
  };

  const handleNews = event => {
    setNews({ ...news, [event.target.name]: event.target.value });
  };

  const editNews = async () => {

    const data = {
      old_name: newsTitle, 
      news: news
    };

    const response = await axios.post(
      "http://localhost/Category-News/backend/api/editNews.php",
      data
    );

    console.log(response.data);

    handleEditNewsForm(false);
    load();
    loadNews();
  };


  return (
    <div className="news-form-container">
      <div className="news-form-body">
        <h2>Edit News</h2>
        <TextField label="Title" name="title" onChange={handleNews} />
        <TextField
          label="Description"
          name="description"
          onChange={handleNews}
        />
        <TextField label="Image URL" name="image" onChange={handleNews} />
        <TextField label="Author" name="author" onChange={handleNews} />
        <TextField label="Link URL" name="link" onChange={handleNews} />
        <div className="form-category-buttons">
          <div className="form-category-add" onClick={editNews}>
            Save
          </div>
          <div className="form-category-cancel" onClick={close}>
            Cancel
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditNewsForm;
