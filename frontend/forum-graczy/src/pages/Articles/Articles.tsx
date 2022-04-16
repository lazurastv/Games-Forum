import Container from '@mui/material/Container';
import ArticleItem from './ArticleItem';
import { ArticleControllerApi } from '../../api/api/apis/ArticleControllerApi';
import { ArticleVM } from '../../api/api';
import { useEffect, useState } from 'react';

const Articles = () => {
  const [articlesArray, setArticlesArray] = useState<ArticleVM[]>([]);
  const articles = new ArticleControllerApi();
  useEffect( () => {
  articles
    .getAllArticles()
    .then((result) => {
      setArticlesArray(result);
    })
    .catch((error) => console.error("Read" + error));
  })

  //co z obrazkami?
  // string | undefined as string - czy to jest poprawnie czy dodać undefined do interfejsu, czy te dane mogą być undefined?
  return (
    <Container maxWidth="xl">
      {articlesArray.map((a, idx) => (
        <ArticleItem
          key={idx}
          date={(a.publishDate as Date).toLocaleString().replace('/', '.').split(',')[0]}
          title={a.title as string}
          author={a.authorName as string}
          image={
            "https://cdn.mos.cms.futurecdn.net/3ZbPC5LNRVccsePfX2PbM7-1200-80.jpg"
          }
        />
      ))}
    </Container>
  );
};
export default Articles;