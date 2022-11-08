import { LikeAdd, LikeControllerApi, LikeVM } from "../api/api";
async function loadLikesByContentId(id: number): Promise<LikeVM[]> {
    const likes = new LikeControllerApi();
    return likes.getLikeByArticleId({ id: id });
}

async function uploadLike(like: LikeAdd) {
    const likes = new LikeControllerApi();
    return likes
    .addLike({likeAdd: like}, { credentials: "include" })
}

async function deleteLike(id: number) {
    const likes = new LikeControllerApi();
    return likes.deleteLike({ id: id }, { credentials: "include" });
}

export { loadLikesByContentId, uploadLike, deleteLike };