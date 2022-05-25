import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import Box from "@mui/material/Box";
interface IDraftEditor {
  editorState: EditorState;
  setEditorState: any;
}

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

export default function DraftEditor(props: IDraftEditor) {
  return (
    <Box
      sx={{
        ".rdw-editor-toolbar img": {
          filter:
            "invert(60%) sepia(33%) saturate(5275%) hue-rotate(12deg) brightness(94%) contrast(83%)",
        },
        ".rdw-editor-toolbar .rdw-dropdown-carettoopen": {
          borderTopColor: "secondary.main",
        },
        ".rdw-editor-toolbar": {
          backgroundColor: "primary.main",
          borderColor: "transparent",
        },
        ".rdw-dropdown-wrapper": {
          backgroundColor: "primary.main",
          borderColor: "background.default",
        },
        ".rdw-option-wrapper": {
          backgroundColor: "primary.main",
          borderColor: "background.default",
        },
        ".card-body": {
          border: "1px solid grey",
          borderRadius: 1,
          mt: 1,
          px: 2,
          py: 1,
          borderColor: "primary.light",
          minHeight: "350px",
        },
      }}
    >
      <Editor
        editorState={props.editorState}
        wrapperClassName="card"
        editorClassName="card-body"
        onEditorStateChange={(newState) => props.setEditorState(newState)}
        toolbar={{
          options: [
            "inline",
            "blockType",
            "fontSize",
            "list",
            "textAlign",
            "history",
            "embedded",
            "emoji",
            "image",
          ],
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
    </Box>
  );
}
