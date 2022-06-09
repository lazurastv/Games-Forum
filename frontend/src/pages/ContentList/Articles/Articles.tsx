import Container from "@mui/material/Container";
import { Box } from "@mui/system";
import { ArticleSearchInfoVM } from "../../../api/api";
import Filter from "../../../components/Filters/Filter/Filter";
import EditMenuSupply from "../../../components/HoverableItem/EditMenuSupply";
import { deleteArticle, loadAllArticles } from "../../../fetchData/fetchArticles";
import withLoading from "../../../fetchData/withLoading";
import { useAlert } from "../../../hooks/useAlert";
import useFilterData from "../../../hooks/useFilterData";
import { convertDate } from "../../../utils/convertDate";
import { ContentList } from "../ContentList.types";
import ArticleItem from "./ArticleItem";

const NGINX_URL = process.env.REACT_APP_NGINX_CONTENT;
interface ArticlesProps extends ContentList {
  articles: ArticleSearchInfoVM[];
}
const Articles = (props: ArticlesProps) => {
  const { articles, edit, userName } = props;
  const filter = useFilterData(articles, userName);
  const { displayAlert } = useAlert();
  const handleDeleteArticle = (id: number, title: string) => {
    deleteArticle(id)
      .then(() => displayAlert(`Pomyślenie usunięto "${title}" `))
      .catch((err) => displayAlert(`Błąd podczas usuwania "${title}" `, true));
    if (props.setReload) {
      props.setReload((r) => r + 1);
    }
  };
  // string | undefined as string - czy to jest poprawnie czy dodać undefined do interfejsu, czy te dane mogą być undefined?
  return (
    <Container maxWidth="xl">
      <Filter sliderLabel="DATA PUBLIKACJI:" data={articles} {...filter.filterControl} />
      <Box sx={{ minHeight: "100vh" }}>
        {filter.Feedback
          ? filter.Feedback
          : filter.data.map((a: any, idx: any) => (
              <EditMenuSupply key={idx} edit={edit} onDelete={() => handleDeleteArticle(a.id, a.title)}>
                <ArticleItem
                  articleId={a.id}
                  content={a.introduction}
                  date={convertDate(a.publishDate)}
                  title={a.title as string}
                  author={a.authorName as string}
                  image={`${NGINX_URL}/${a.path}/horizontal.png`}
                />
              </EditMenuSupply>
            ))}
      </Box>
    </Container>
  );
};
export default withLoading(Articles, { articles: loadAllArticles });
