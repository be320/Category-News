import React from 'react';
import { Editor } from '@tinymce/tinymce-react';

const TinyEditor = ({handleContent}) => {

   const handleEditorChange = (content, editor) => {
        console.log('Content was updated:', content);
        handleContent(content)
      }

      return(
          <div>
        <Editor
        apiKey="8qe1k8oszntwouo0m23pi3l500ygsg6vxidh530a3nebve0t"
        initialValue="<p>This is the initial content of the editor</p>"
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