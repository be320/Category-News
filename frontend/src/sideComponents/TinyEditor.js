import React from 'react';
import { Editor } from '@tinymce/tinymce-react';

const TinyEditor = ({handleContent,oldContent}) => {

   const handleEditorChange = (content, editor) => {
        handleContent(content)
      }

      return(
          <div>
        <Editor
        apiKey="8qe1k8oszntwouo0m23pi3l500ygsg6vxidh530a3nebve0t"
        initialValue={oldContent ? oldContent :"<p>Enter The content of Your News here</p>"}
        init={{
          min_height: "1000",
          resize: false,
          menubar: false,
          plugins: [
            'advlist autolink lists link image charmap print preview anchor',
            'searchreplace visualblocks code fullscreen',
            'insertdatetime media table paste code help wordcount'
          ],
          toolbar:
            'undo redo | formatselect | bold italic backcolor forecolor | \
            alignleft aligncenter alignright alignjustify | \
            bullist numlist outdent indent | removeformat | help'
        }}
        onEditorChange={handleEditorChange}
      />
      </div>
      )
}

export default TinyEditor;