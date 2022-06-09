import React from "react";
import { useState } from "react";
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
  Box,
} from "@mui/material";
import { CommentVM, CommentAdd } from "../../api/api";
import { loadCommentsByContentId, uploadComment } from "../../fetchData/fetchComments";
import withLoading from "../../fetchData/withLoading";
import { useSessionContext } from "../../components/Authentication/SessionContext";
import { Link } from "react-router-dom";
import { convertDate } from "../../utils/convertDate";


function Comments({
  comments,
  contentId,
}: {
  comments: CommentVM[];
  contentId: number;
}) {
  const { session } = useSessionContext();
  const [commentContent, setCommentContent] = useState<string>("");
  const [comments2, setComments2] = useState<CommentVM[]>(comments);

  const handleSave = async () => {
    const comment: CommentAdd = {
      contentId: contentId,
      comment: commentContent,
    };
    uploadComment(comment).then(r => 
    loadCommentsByContentId(contentId).then((x) => {setComments2(x)}));
    setCommentContent("");
  };

  return (
    <>
      {session.isAuthenticated ? (
        <Box
          component="form"
          onSubmit={(e: any) => {
            handleSave();
            e.preventDefault();
          }}
        >
          <TextField
            id="outlined-multiline-static"
            label="Wpisz komentarz!"
            multiline
            value={commentContent}
            onChange={(e: any) => setCommentContent(e.target.value)}
            rows={3}
            color="secondary"
            autoFocus={false}
            helperText="Pamiętaj o kulturze wypowiedzi, maksymalna długość komentarza to XXX znaków."
            sx={{ width: "100%" }}
          />
          <Stack direction="row" justifyContent="end">
            <Button
              disableElevation
              type="submit"
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
        </Box>
      ) : (
        <Typography variant="body1" align="center" sx={{ fontSize: 28 }}>
          <Link to="/logowanie">Zaloguj się aby dodać komentarz!</Link>
        </Typography>
      )}
      {comments2.length === 0 ? (
        <Box sx={{ mb: 2 }}>
          <Typography variant="body1" align="center" sx={{ fontSize: 28 }}>
            Nikt jeszcze nie dodał komentarza.
          </Typography>
          <Typography
            variant="body1"
            align="center"
            sx={{ fontSize: 22, color: "secondary.main" }}
          >
            Zostań pierwszym komentującym!
          </Typography>
        </Box>
      ) : (
        <List sx={{ width: "100%", backgroundColor: "primary.main", my: 4 }}>
          {comments2.map((comment: CommentVM, idx) => {
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
                    primary={comment.authorName}
                    secondary={comment.comment}
                    primaryTypographyProps={{
                      fontSize: 22,
                    }}
                    secondaryTypographyProps={{
                      fontSize: 16,
                    }}
                    sx={{ mt: 2 }}
                  ></ListItemText>
                  <Typography sx={{ color: "text.secondary", mt: 1 }}>
                    {convertDate(comment.publishDate)}
                  </Typography>
                </ListItem>
                {idx !== comments2.length - 1 ? <Divider /> : null}
              </React.Fragment>
            );
          })}
        </List>
      )}
    </>
  );
};

export default withLoading(Comments, {
  comments: loadCommentsByContentId, 
});
