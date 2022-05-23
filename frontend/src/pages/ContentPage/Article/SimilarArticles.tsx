import { ArticleSearchInfoVM } from "../../../api/api";
import Carousel from "../../../components/Carousel/Carousel";
import ArticleTile from "../../../components/Tile/ArticleTile";
import { loadSimilarArticles } from "../../../fetchData/fetchArticles";
import withLoading from "../../../fetchData/withLoading";
import { convertDate } from "../../../utils/convertDate";

const NGINX_URL = process.env.REACT_APP_NGINX_CONTENT;

function SimilarArticles({ articles }: { articles: ArticleSearchInfoVM }) {
  return (
    <Carousel>
      {Array(10)
        .fill(articles)
        .flat()
        .map((a, idx) => (
          <ArticleTile
            articleId={a.id}
            key={idx}
            title={a.title}
            src={`${NGINX_URL}/${a.path}/horizontal.png`}
            author={a.authorName}
            date={convertDate(a.publishDate)}
          />
        ))}
    </Carousel>
  );
}
export default withLoading(SimilarArticles, {
  articles: loadSimilarArticles,
});
