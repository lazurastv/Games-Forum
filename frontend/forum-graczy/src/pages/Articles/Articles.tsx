import Container from '@mui/material/Container';
import { articles } from '../../data-mock/articles';
import ArticleItem from './ArticleItem';


const Articles = () => {

  return (
    <Container maxWidth="xl">
      {articles.map((a, idx) => 
      <ArticleItem key={idx} date={a.date} title={a.title} author={a.author} image={a.image}/>
      )}
    </Container>
  );
};
export default Articles;