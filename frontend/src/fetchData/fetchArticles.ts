import { AuthApi } from "../api/api/apis/AuthApi";
import { ArticleAddUpdate, ArticleControllerApi, ArticleFullInfoVM, ArticleSearchInfoVM, ArticleVM } from "../api/api";
async function loadSimilarArticles(id: number): Promise<ArticleVM[]> {
  const auth = new AuthApi();
  const articles = new ArticleControllerApi();
  return auth.login().then((result) => articles.getSimilarArticles({ articleId: id }));
}
async function loadAllArticles(): Promise<ArticleSearchInfoVM[]> {
  const auth = new AuthApi();
  const articles = new ArticleControllerApi();
  return auth.login().then((result) => articles.getAllArticlesSearchInfos());
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
    .then((result) =>
      articles.addArticle({ articleAddUpdate: article }, { credentials: "include" })
    )
    .catch((error) => console.error("Add " + error))
    .then((result) => articles.getAllArticles())
    .then((result) => {
      result.forEach((x) => console.log(x));
    })
    .catch((error) => console.error("Read" + error));
}
export { uploadArticle, loadArticle, loadAllArticles, loadSimilarArticles };
