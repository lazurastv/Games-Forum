import { AuthApi } from "../../../api/api/apis/AuthApi";
import {
  ArticleAddUpdate,
  ArticleControllerApi,
  ArticleFullInfoVM,
} from "../../../api/api";
import draftToHtml from "draftjs-to-html";
export interface UploadArticle {
  title: string;
  introduction: string;
  content: string;
}
// <div dangerouslySetInnerHTML={{ __html: art.content }}/>
function loadArticle(id: number): ArticleFullInfoVM | null {
  const auth = new AuthApi();
  const articles = new ArticleControllerApi();
  auth
    .login()
    .then((result) => {
      articles
        .getArticleFullInfo({ articleId: id })
        .then((result) => {
          if (result.path) {
            let art = {
              ...result,
              content: draftToHtml(JSON.parse(result.path)),
            } as ArticleFullInfoVM;
            console.log(art);
            return art;
          }
          return null;
        })
        .catch((error) => console.error("Read" + error));
    })
    .catch((error) => console.error("Login " + error));
  return null;
}
function uploadArticle(art: UploadArticle) {
  const auth = new AuthApi();
  const articles = new ArticleControllerApi();
  auth
    .login()
    .then((result) => {
      const article = art as ArticleAddUpdate;
      articles
        .addArticle({ articleAddUpdate: article }, { credentials: "include" })
        /*  
		 .then((result) => {
		  articles
			.getAllArticles()
			.then((result) => {
			  result.forEach((x) => console.log(x));
			})
			.catch((error) => console.error("Read" + error));
		}) 
		*/
        .catch((error) => console.error("Add " + error));
    })
    .catch((error) => console.error("Login " + error));
}
export { uploadArticle, loadArticle };
