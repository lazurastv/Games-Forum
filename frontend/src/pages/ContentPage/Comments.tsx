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
import { useAlert } from "../../hooks/useAlert";
const NGINX_URL = process.env.REACT_APP_NGINX_USER;

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
    if(comment.comment?.trim().length === 0){
      alert("Nie można dodać pustego komentarza!")
    } else {
      uploadComment(comment).then((r) =>
      loadCommentsByContentId(contentId).then((x) => {
      setComments2(x);
  })
);
setCommentContent("");
    }
    
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
                    <Link to={`/profil/${comment.authorVM?.id}`}>
                    <Avatar
                      alt="avatar"
                      src={`${NGINX_URL}/${comment.authorVM?.profilePicturePath}/profile.png`}
                      sx={{ width: 44, height: 44 }}
                    />
                    </Link>
                  </ListItemAvatar>
                  <ListItemText
                    primary={comment.authorVM?.name}
                    secondary={comment.comment}
                    primaryTypographyProps={{
                      fontSize: 22,
                    }}
                    secondaryTypographyProps={{
                      fontSize: 16,
                    }}
                    sx={{ mt: 2, ml: 1 }}
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
