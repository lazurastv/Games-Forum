import Container from "@mui/material/Container";
import { ArticleSearchInfoVM } from "../../api/api";
import Filter from "../../components/Filters/Filter";
import { loadAllArticles } from "../../fetchData/fetchArticles";
import withLoading from "../../fetchData/withLoading";
import { convertDate } from "../../utils/convertDate";
import ArticleItem from "./ArticleItem";
const Articles = ({ data }: { data: { articles: ArticleSearchInfoVM[] } }) => {
  const { articles } = data;
  //co z obrazkami?
  // string | undefined as string - czy to jest poprawnie czy dodać undefined do interfejsu, czy te dane mogą być undefined?
  return (
    <Container maxWidth="xl">
      <Filter />
      {articles.map((a: any, idx: any) => (
        <ArticleItem
          key={idx}
          articleId={a.id}
          content={a.introduction}
          date={convertDate(a.publishDate)}
          title={a.title as string}
          author={a.authorName as string}
          image="https://cdn.mos.cms.futurecdn.net/3ZbPC5LNRVccsePfX2PbM7-1200-80.jpg"
        />
      ))}
    </Container>
  );
};
export default withLoading(Articles, { articles: async () => await loadAllArticles() });
