import { CommentAdd, CommentControllerApi, CommentVM } from "../api/api";
async function loadCommentsByContentId(id: number): Promise<CommentVM[]> {
    const comments = new CommentControllerApi();
    return comments.getCommentByArticleId({ id: id });
}

async function uploadComment(comment: CommentAdd) {
    const comments = new CommentControllerApi();
    return comments
    .addComment({commentAdd: comment}, { credentials: "include" })
}

export { loadCommentsByContentId, uploadComment }

