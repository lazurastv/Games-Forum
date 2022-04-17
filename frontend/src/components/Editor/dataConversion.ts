import {
  ContentState,
  convertFromRaw,
  convertToRaw,
  EditorState,
  RawDraftContentState,
} from "draft-js";
import draftToHtml from "draftjs-to-html";
// stringified JSON - stored in DB
// stringified html - showed on page
// EditorState		- displayed and edited in DraftEditor

// Converts EditorState to stringified JSON
function editorToString(editorState: EditorState): string {
  const content: ContentState = editorState.getCurrentContent();
  const json: RawDraftContentState = convertToRaw(content);
  return JSON.stringify(json);
}

// Converts stringified JSON to stringified html
// embed result in dangerouslySetInnerHTML attribute
//
// Example:
// const [html, setHtml] = useState<string>("");
// const loadedArticle = await loadArticle(20);
// if (loadedArticle && loadedArticle.path) {
//   setHtml(stringToHtml(loadedArticle.path));
// }
// ...
// <div dangerouslySetInnerHTML={{ __html: html }}/>
//
function stringToHtml(path: string): string {
  const json: RawDraftContentState = JSON.parse(path);
  const html: string = draftToHtml(json);
  return html;
}

// Convets stringified JSON to EditorState
// use when you want do push data to DraftEditor by passing it as edidorState prop
//
// Example:
// const [editorState, setEditorState] = useState<EditorState>(EditorState.createEmpty());
// const loadedArticle = await loadArticle(20);
// if (loadedArticle && loadedArticle.path) {
//   setEditorState(stringToEditorState(loadedArticle.path));
// }
// ...
// <DraftEditor editorState={editorState} setEditorState={setEditorState} />
//
function stringToEditorState(path: string): EditorState {
  const json: RawDraftContentState = JSON.parse(path);
  const content: ContentState = convertFromRaw(json);
  const editorState = EditorState.createWithContent(content);
  return editorState;
}

export { editorToString, stringToHtml, stringToEditorState };
