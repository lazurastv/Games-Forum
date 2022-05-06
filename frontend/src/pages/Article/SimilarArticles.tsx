import { Box } from "@mui/system";
import React from "react";
import Carousel from "../../components/Carousel/Carousel";
import ArticleTile from "../../components/Tile/ArticleTile";
import { loadSimilarArticles } from "../../fetchData/fetchArticles";
import withLoading from "../../fetchData/withLoading";
import { convertDate } from "../../utils/convertDate";

function SimilarArticles({ data: reviewsCarousel }) {
  return (
    <Carousel>
      {Array(10)
        .fill(reviewsCarousel)
        .flat()
        .map((a, idx) => (
          <ArticleTile
            articleId={a.id}
            key={idx}
            title={a.title}
            src="https://allegro.stati.pl/AllegroIMG/PRODUCENCI/Bethesda/Fallout%204/GOTY/f2.jpg"
            author={a.authorName}
            date={convertDate(a.publishDate)}
          />
        ))}
    </Carousel>
  );
}
export default withLoading(SimilarArticles, async (fetchId: number) => loadSimilarArticles(fetchId));
