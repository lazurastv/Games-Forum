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
const NGINX_URL = process.env.REACT_APP_NGINX_CONTENT;
const Articles = ({ articles }: { articles: ArticleSearchInfoVM[] }) => {
  const [idxToFilter, setIdxToFilter] = useState<number[]>([]);
  const [sortOrder, setSortOrder] = useState<number[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  console.log(articles);
  //co z obrazkami?
  // string | undefined as string - czy to jest poprawnie czy dodać undefined do interfejsu, czy te dane mogą być undefined?
  return (
    <Container maxWidth="xl">
      <Filter
        sliderLabel="DATA PUBLIKACJI:"
        data={articles}
        setSortOrder={setSortOrder}
        setLoading={setLoading}
        setIdxToFilter={setIdxToFilter}
      />
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
          sortOrder
            .map((id) => articles.find((a) => a.id === id))
            .filter((a) => a && a.id && !idxToFilter.includes(a.id))
            .map((a: any, idx: any) => (
              <ArticleItem
                key={idx}
                articleId={a.id}
                content={a.introduction}
                date={convertDate(a.publishDate)}
                title={a.title as string}
                author={a.authorName as string}
                image={`${NGINX_URL}/${a.path}/horizontal.png`}
              />
            ))
        )}
      </Box>
    </Container>
  );
};
export default withLoading(Articles, { articles: loadAllArticles });
