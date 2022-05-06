import Container from "@mui/material/Container";
import { loadAllArticles } from "../../fetchData/fetchArticles";
import withLoading from "../../fetchData/withLoading";
import ArticleItem from "./ArticleItem";
const Articles = (props: any) => {
  //co z obrazkami?
  // string | undefined as string - czy to jest poprawnie czy dodać undefined do interfejsu, czy te dane mogą być undefined?
  return (
    <Container maxWidth="xl">
      {props.data.map((a: any, idx: any) => (
        <ArticleItem
          key={idx}
          date={(a.publishDate as Date).toLocaleString().replace("/", ".").split(",")[0]}
          title={a.title as string}
          author={a.authorName as string}
          image={"https://cdn.mos.cms.futurecdn.net/3ZbPC5LNRVccsePfX2PbM7-1200-80.jpg"}
        />
      ))}
    </Container>
  );
};
export default withLoading(Articles, async () => await loadAllArticles());
