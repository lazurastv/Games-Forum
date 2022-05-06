import { AuthApi } from "../api/api/apis/AuthApi";
import { ArticleAddUpdate, ArticleControllerApi, ArticleFullInfoVM, ArticleVM } from "../api/api";
async function loadAllArticles(): Promise<void | ArticleVM[]> {
  const auth = new AuthApi();
  const articles = new ArticleControllerApi();
  return auth.login().then((result) => articles.getAllArticles());
}
async function loadArticle(id: number): Promise<ArticleFullInfoVM> {
  const auth = new AuthApi();
  const articles = new ArticleControllerApi();
  return auth.login().then((result) => articles.getArticleFullInfo({ articleId: id }));
}
async function uploadArticle(article: ArticleAddUpdate) {
  const auth = new AuthApi();
  const articles = new ArticleControllerApi();
  return auth
    .login()
    .catch((error) => console.error("Login " + error))
    .then((result) => articles.addArticle({ articleAddUpdate: article }, { credentials: "include" }))
    .catch((error) => console.error("Add " + error))
    .then((result) => articles.getAllArticles())
    .then((result) => {
      result.forEach((x) => console.log(x));
    })
    .catch((error) => console.error("Read" + error));
}
export { uploadArticle, loadArticle, loadAllArticles };
