import { Grid, Typography, IconButton } from "@mui/material"
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbDownAltOutlinedIcon from "@mui/icons-material/ThumbDownAltOutlined";
import {
  loadLikesByContentId,
  uploadLike,
  deleteLike,
} from "../../fetchData/fetchLikes";
import withLoading from "../../fetchData/withLoading";
import { LikeVM, LikeAdd } from "../../api/api";
import { useState } from "react";
import { useSessionContext } from "../../components/Authentication/SessionContext";

const ContentLikes = ({
  likes,
  contentId,
}: {
  likes: LikeVM[];
  contentId: number;
}) => {
  const {session: { user }} = useSessionContext();
  const [likes2, setLikes2] = useState<LikeVM[]>(likes);
  var n_l = likes2.filter((x) => x.isLike === true).length;
  var n_d = likes2.filter((x) => x.isLike === false).length;
  const [numLikes, setNumLikes] = useState<number>(n_l);
  const [numDislikes, setNumDislikes] = useState<number>(n_d);

  
  // 0 - nothing, 1 - like, -1 - diskilke
  const checkUserLike = () => {
    const l = likes2.find((x) => x.authorName === user?.username)
    if (l === undefined){
      return 0
    } else if(l.isLike === true) {
      return 1
    } else {
      return -1
    }
  }

  const getUserLike = () => {
    const l = likes2.find((x) => x.authorName === user?.username);
    if (l === undefined) {
      console.log("nie zwraca id!!!")
      return -1;
    } else {
      return l.id;
    }
  }

  const [userLike, setUserLike] = useState<number>(checkUserLike());

  const handleLike = () => {
    const like: LikeAdd = {
      contentId: contentId,
      isLike: true,
    };
    if (userLike === -1){
      deleteLike(getUserLike() as number);
      uploadLike(like).then(() => {
        setNumLikes((l) => l + 1);
        setNumDislikes((l) => l - 1);
        setUserLike(1);
        loadLikesByContentId(contentId).then((x) => {
          setLikes2(x);
        });
      });
    } else if (userLike === 1) {
      setNumLikes((l) => l - 1);
      deleteLike(getUserLike() as number).then(() => loadLikesByContentId(contentId).then((x) => {setLikes2(x)}));
      setUserLike(0);
    } else {
      uploadLike(like).then(() => {
        setNumLikes((l) => l + 1);
        loadLikesByContentId(contentId).then((x) => {
        setLikes2(x);
      });});
      setUserLike(1);
    }
    
  };

  const handleDislike = () => {
    const like: LikeAdd = {
      contentId: contentId,
      isLike: false,
    };
    if(userLike === 1){
      deleteLike(getUserLike() as number);
      uploadLike(like).then(() => {
        setNumDislikes((l) => l + 1);
        setNumLikes((l) => l - 1);
        setUserLike(-1);
        loadLikesByContentId(contentId).then((x) => {
          setLikes2(x);
        });
      });
    } else if (userLike === -1) {
      setNumDislikes((l) => l - 1);
      deleteLike(getUserLike() as number).then(() => loadLikesByContentId(contentId).then((x) => {setLikes2(x)}));
      setUserLike(0);
    } else {
      uploadLike(like).then(() => {
        setNumDislikes((l) => l + 1);
        loadLikesByContentId(contentId).then((x) => {
          setLikes2(x);
        });
      });
      setUserLike(-1);
    }
    loadLikesByContentId(contentId).then((x) => {setLikes2(x)});
    
  };

  return (
    <Grid
      container
      direction="row"
      justifyContent="flex-start"
      alignItems="center"
    >
      <Grid item>
        <IconButton onClick={handleLike}>
          {userLike === 1 ? (
            <ThumbUpIcon
              sx={{ color: "staticText.secondary", fontSize: "22px" }}
            />
          ) : (
            <ThumbUpOutlinedIcon
              sx={{ color: "staticText.secondary", fontSize: "22px" }}
            />
          )}
        </IconButton>
      </Grid>
      <Grid item>
        <Typography sx={{ ml: 0.5, textAlign: "left" }}>{numLikes}</Typography>
      </Grid>
      <Grid item sx={{ ml: 2 }}>
        <IconButton onClick={handleDislike}>
          {userLike === -1 ? (
            <ThumbDownIcon
              sx={{ color: "staticText.secondary", fontSize: "22px" }}
            />
          ) : (
            <ThumbDownAltOutlinedIcon
              sx={{ color: "staticText.secondary", fontSize: "22px" }}
            />
          )}
        </IconButton>
      </Grid>
      <Grid item>
        <Typography sx={{ ml: 0.5, textAlign: "left" }}>
          {numDislikes}
        </Typography>
      </Grid>
    </Grid>
  );
};
export default withLoading(ContentLikes, {
    likes: loadLikesByContentId,
});