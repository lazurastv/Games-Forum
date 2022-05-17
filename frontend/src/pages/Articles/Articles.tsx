import { Typography } from "@mui/material";
import Container from "@mui/material/Container";
import { Box } from "@mui/system";
import { useState } from "react";
import { ArticleSearchInfoVM } from "../../api/api";
import Filter from "../../components/Filters/Filter/Filter";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import { loadAllArticles } from "../../fetchData/fetchArticles";
import withLoading from "../../fetchData/withLoading";
import { convertDate } from "../../utils/convertDate";
import ArticleItem from "./ArticleItem";
const Articles = ({ articles }: { articles: ArticleSearchInfoVM[] }) => {
  const [idxToFilter, setIdxToFilter] = useState<number[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  console.log(articles);
  //co z obrazkami?
  // string | undefined as string - czy to jest poprawnie czy dodać undefined do interfejsu, czy te dane mogą być undefined?
  return (
    <Container maxWidth="xl">
      <Filter setLoading={setLoading} sliderLabel="DATA PUBLIKACJI:" data={articles} setIdxToFilter={setIdxToFilter} />
      <Box sx={{ minHeight: "100vh" }}>
        {loading ? (
          <LoadingSpinner />
        ) : idxToFilter.length === articles.length ? (
          <Typography
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "24px",
              minHeight: "200px",
            }}
          >
            {"Nie znaleziono żadnych artykułów odpowiadających ustawieniom filtrowania :("}
          </Typography>
        ) : (
          articles
            .filter((a, idx) => a.id && !idxToFilter.includes(a.id))
            .map((a: any, idx: any) => (
              <ArticleItem
                key={idx}
                articleId={a.id}
                content={a.introduction}
                date={convertDate(a.publishDate)}
                title={a.title as string}
                author={a.authorName as string}
                image="https://cdn.mos.cms.futurecdn.net/3ZbPC5LNRVccsePfX2PbM7-1200-80.jpg"
              />
            ))
        )}
      </Box>
    </Container>
  );
};
export default withLoading(Articles, { articles: loadAllArticles });
