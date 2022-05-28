import { CommentAdd, CommentControllerApi, CommentUpdate, CommentVM } from "../api/api";
async function loadCommentsByContentId(id: number): Promise<CommentVM[]> {
    const comments = new CommentControllerApi();
    return comments.getCommentByArticleId({ id: id });
}

export { loadCommentsByContentId }

