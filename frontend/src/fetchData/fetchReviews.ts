import { ReviewAdd, ReviewControllerApi, ReviewSearchInfoVM } from "../api/api";
import { ReviewAddUpdate } from "../api/api/models/ReviewAddUpdate";
async function loadSimilarReviews(id: number) {
  const reviews = new ReviewControllerApi();
  return reviews.getSimilarReviews({ reviewId: id });
}
async function loadAllReviews(): Promise<ReviewSearchInfoVM[]> {
  const reviews = new ReviewControllerApi();
  return reviews.getAllReviewSearchInfos();
}
async function loadReview(id: number) {
  const reviews = new ReviewControllerApi();
  return reviews.getReviewFullInfo({ reviewId: id }).then((result) => ({
    ...result,
    //   content: result?.path ? stringToHtml(result?.path) : "Loading error",
  }));
}
async function deleteReview(id: number) {
  const reviews = new ReviewControllerApi();
  return reviews.deleteReview({ reviewId: id }, { credentials: "include" });
}
async function uploadReview(review: ReviewAdd, files: FormData) {
  const reviews = new ReviewControllerApi();
  const id: number = await reviews.addReview({ reviewAdd: review }, { credentials: "include" });
  fetch(`http://localhost:8080/api/review/upload-content-and-images/${id}`, {
    method: "POST",
    body: files,
    credentials: "include",
  });
  return id;
}
async function updateReview(id: number, review: ReviewAddUpdate, files: FormData) {
  const reviews = new ReviewControllerApi();
  fetch(`http://localhost:8080/api/review/upload-content-and-images/${id}`, {
    method: "POST",
    body: files,
    credentials: "include",
  });
  return reviews.updateReview(
    {
      reviewId: id,
      reviewUpdate: review,
    },
    { credentials: "include" }
  );
}
export { uploadReview, loadReview, loadAllReviews, loadSimilarReviews, deleteReview, updateReview };
