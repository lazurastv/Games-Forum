import React from "react";
import {
  List,
  ListItem,
  Divider,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
  TextField,
  Stack,
  Button,
} from "@mui/material";
import { CommentVM } from "../../api/api";
import { loadCommentsByContentId } from "../../fetchData/fetchComments";
import withLoading from "../../fetchData/withLoading";

const comments = [
  {
    author: "Bartłomiej Czekaj",
    content: "Fajny artykuł! Bardzo ciekawy",
    date: "30.12.2021",
  },
  {
    author: "Major Suchodolski",
    content: "artykuł! Fajny ciekawy oguem",
    date: "31.12.2021",
  },
  {
    author: "Krzysztof Piłsudski",
    content: "Ja jestem mlecznym człowiekiem, mleko lubie, lubie mleko, chrum",
    date: "29.12.2021",
  },
  {
    author: "Andrzej Gieremek",
    content: "Fajny artykuł! Bardzo ciekawy i tego",
    date: "21.12.2021",
  },
];

interface IComment {
  author: string;
  content: string;
  date: string;
}

const Comments = () => {
  return (
    <>
      <TextField
        id="outlined-multiline-static"
        label="Wpisz komentarz!"
        multiline
        rows={3}
        color="secondary"
        autoFocus={false}
        helperText="Pamiętaj o kulturze wypowiedzi, maksymalna długość komentarza to XXX znaków."
        sx={{ width: "100%" }}
      />
      <Stack direction="row" justifyContent="end">
        <Button
          disableElevation
          variant="outlined"
          color="secondary"
          sx={{
            color: "text.primary",
            borderColor: "secondary.main",
            width: 200,
            mt: 1,
            mb: 3,
          }}
        >
          Dodaj komentarz
        </Button>
      </Stack>

      <List sx={{ width: "100%", backgroundColor: "primary.main", mb: 5 }}>
        {comments.map((comment: IComment, idx) => {
          return (
            <React.Fragment key={idx}>
              <ListItem key={idx} alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar
                    alt="avatar"
                    src="https://i1.sndcdn.com/avatars-U0SzwN1Sc5v8nztz-mqhSUw-t240x240.jpg"
                    sx={{ mr: 2, width: 44, height: 44 }}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={comment.author}
                  secondary={comment.content}
                  primaryTypographyProps={{
                    fontSize: 22,
                  }}
                  secondaryTypographyProps={{
                    fontSize: 16,
                  }}
                  sx={{ mt: 2 }}
                ></ListItemText>
                <Typography sx={{ color: "text.secondary", mt: 1 }}>
                  {comment.date}
                </Typography>
              </ListItem>
              {idx !== comments.length - 1 ? <Divider /> : null}
            </React.Fragment>
          );
        })}
      </List>
    </>
  );
};

export default Comments;
