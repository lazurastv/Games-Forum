import { ArticleAddUpdate, ArticleControllerApi, ArticleFullInfoVM, ArticleSearchInfoVM, ArticleVM } from "../api/api";
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
async function deleteArticle(id: number): Promise<void> {
  const articles = new ArticleControllerApi();
  return articles.deleteArticle({ articleId: id }, { credentials: "include" });
}
async function uploadArticle(article: ArticleAddUpdate, files: FormData) {
  const articles = new ArticleControllerApi();
  const id: number = await articles.addArticle({ articleAddUpdate: article }, { credentials: "include" });
  await fetch(`${process.env.REACT_APP_URL}/api/article/upload-content-and-images/${id}`, {
    method: "POST",
    body: files,
    credentials: "include",
  });
  return id;
}
async function updateArticle(id: number, article: ArticleAddUpdate, files: FormData) {
  const articles = new ArticleControllerApi();
  await fetch(`${process.env.REACT_APP_URL}/api/article/upload-content-and-images/${id}`, {
    method: "POST",
    body: files,
    credentials: "include",
  });
  return articles.updateArticle(
    {
      articleId: id,
      articleAddUpdate: article,
    },
    { credentials: "include" }
  );
}
export { uploadArticle, loadArticle, loadAllArticles, loadSimilarArticles, deleteArticle, updateArticle };
