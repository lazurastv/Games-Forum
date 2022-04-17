import { AuthApi } from "../../../api/api/apis/AuthApi";
import {
  ArticleAddUpdate,
  ArticleControllerApi,
  ArticleFullInfoVM,
} from "../../../api/api";
import {
  editorToString,
  stringToHtml,
} from "../../../components/Editor/dataConversion";
import { EditorState } from "draft-js";
export interface UploadArticle {
  title: string;
  introduction: string;
  editorState: EditorState;
}

async function loadArticle(id: number) {
  const auth = new AuthApi();
  const articles = new ArticleControllerApi();
  return auth
    .login()
    .then((result) => articles.getArticleFullInfo({ articleId: id }))
    .catch((error) => console.error("Read" + error))
    .then((result) => ({
      ...result,
      content: result?.path ? stringToHtml(result?.path) : "Loading error",
    }))
    .catch((error) => console.error("Login " + error));
}
async function uploadArticle(art: UploadArticle) {
  const auth = new AuthApi();
  const articles = new ArticleControllerApi();
  return auth
    .login()
    .catch((error) => console.error("Login " + error))
    .then((result) => {
      const article = {
        title: art.title,
        //
        // TODO introduction
        //
        introduction: art.introduction,
        content: editorToString(art.editorState),
      } as ArticleAddUpdate;
      return articles.addArticle(
        { articleAddUpdate: article },
        { credentials: "include" }
      );
    })
    .catch((error) => console.error("Add " + error))
    .then((result) => articles.getAllArticles())
    .then((result) => {
      result.forEach((x) => console.log(x));
    })
    .catch((error) => console.error("Read" + error));
}
export { uploadArticle, loadArticle };
