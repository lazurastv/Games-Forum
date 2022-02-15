import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import ArticleItem from '../ArticleItem';
import { articles } from '../data-mock/articles';


const Articles = () => {

  return (
    <Container maxWidth="xl">
      {articles.map((a) => 
      <ArticleItem date={a.date} title={a.title} author={a.author} image={a.image}/>
      )}
    </Container>
  );
};
export default Articles;