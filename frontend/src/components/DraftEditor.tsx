import React, { useState } from "react";
import { EditorState, ContentState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";

function uploadImageCallBack(file: File) {
  /*
        return new Promise((resolve, reject) => {
            
            const xhr = new XMLHttpRequest();
            xhr.open("POST", "https://api.imgur.com/3/image");
            xhr.setRequestHeader("Authorization", "Client-ID XXXXX");
            const data = new FormData();
            data.append("image", file);
            xhr.send(data);
            xhr.addEventListener("load", () => {
                const response = JSON.parse(xhr.responseText);
                resolve(response);
            });
            xhr.addEventListener("error", () => {
                const error = JSON.parse(xhr.responseText);
                reject(error);
            });
        });*/
  const imageObject = {
    file: file,
    localSrc: URL.createObjectURL(file),
  };
  return new Promise((resolve, reject) => {
    resolve({ data: { link: imageObject.localSrc } });
  });
}
function saveContent(contentState: ContentState) {
  var content = convertToRaw(contentState);
  localStorage.setItem("content", JSON.stringify(content));
  // let apiURL: string = "https://...";
  // let articleId: number;
  // try {
  //     const response = await fetch(`${apiURL}/api/${articleId}`, {
  //         method: 'POST',
  //         headers: {
  //             'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify(content)
  //     });
  //     if (!response || !response.ok) {
  //         throw new Error(response.statusText);
  //     }
  // } catch (err) {
  //     console.log(err);
  //     return null;
  // }
}
function loadContent() {
  // let apiURL: string = "https://...";
  // let articleId: number;
  // try {
  //     const response = await fetch(`${apiURL}/api/${articleId}`, {
  //         method: 'GET',
  //         headers: {
  //             'Content-Type': 'application/json',
  //         },
  //     });
  //     if (!response || !response.ok) {
  //         throw new Error(response.statusText);
  //     }
  // } catch (err) {
  //     console.log(err);
  //     return null;
  // }
  var ct = localStorage.getItem("content");
  if (ct !== null) {
    return JSON.parse(ct);
  }
  return null;
}

function DraftEditor() {
  const [content, setContent] = useState<string>("");
  const [editorState, setEditorState] = useState<EditorState>(EditorState.createEmpty());
  return (
    <Container>
      <h1>Create your own article!</h1>
      <Box
        sx={{
          p: 2,
          border: "1px solid grey",
          ".rdw-editor-toolbar img": {
            filter: "invert(60%) sepia(33%) saturate(5275%) hue-rotate(12deg) brightness(94%) contrast(83%)",
          },
          ".rdw-editor-toolbar .rdw-dropdown-carettoopen": {
            borderTopColor: "secondary.main",
          },
          ".rdw-editor-toolbar": {
            backgroundColor: "primary.main",
            borderColor:"transparent"
          },
          ".rdw-dropdown-wrapper": {
            backgroundColor: "primary.main",
            borderColor:"background.default"

          },
          ".rdw-option-wrapper": {
            backgroundColor: "primary.main",
            borderColor:"background.default"

          },
        }}
      >
        <Editor
          editorState={editorState}
          wrapperClassName="card"
          editorClassName="card-body"
          onEditorStateChange={(newState) => {
            setEditorState(newState);
          }}
          toolbar={{
            options: ["inline", "blockType", "fontSize", "list", "textAlign", "history", "embedded", "emoji", "image"],
            image: {
              uploadCallback: uploadImageCallBack,
              previewImage: true,
              alt: { present: true, mandatory: false },
              inputAccept: "image/gif,image/jpeg,image/jpg,image/png,image/svg",
            },
            inline: { inDropdown: true },
            list: { inDropdown: true },
            textAlign: { inDropdown: true },
            link: { inDropdown: true },
            history: { inDropdown: true },
          }}
        />
        <Button
          sx={{ mr: 2 }}
          variant="contained"
          color="secondary"
          onClick={() => {
            saveContent(editorState.getCurrentContent());
          }}
        >
          Save
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => {
            var html = draftToHtml(loadContent());
            setContent(html);
          }}
        >
          Load
        </Button>
      </Box>
      <div dangerouslySetInnerHTML={{ __html: content }}></div>
      <div></div>
    </Container>
  );
}

export default DraftEditor;
