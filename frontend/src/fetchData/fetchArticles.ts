import {
  ArticleAddUpdate,
  ArticleControllerApi,
  ArticleFullInfoVM,
  ArticleSearchInfoVM,
  ArticleVM,
} from "../api/api";
async function loadSimilarArticles(id: number): Promise<ArticleVM[]> {
  const articles = new ArticleControllerApi();
  return articles.getSimilarArticles({ articleId: id });
}
async function loadAllArticles(): Promise<ArticleSearchInfoVM[]> {
  const articles = new ArticleControllerApi();
  return articles.getAllArticlesSearchInfos();
}
async function loadArticle(id: number): Promise<ArticleFullInfoVM> {
  const articles = new ArticleControllerApi();
  return articles.getArticleFullInfo({ articleId: id });
}
async function uploadArticle(article: ArticleAddUpdate) {
  const articles = new ArticleControllerApi();
  return articles
    .addArticle({ articleAddUpdate: article }, { credentials: "include" })
    .then((result) => articles.getAllArticles())
    .then((result) => {
      result.forEach((x) => console.log(x));
    });
}
export { uploadArticle, loadArticle, loadAllArticles, loadSimilarArticles };
