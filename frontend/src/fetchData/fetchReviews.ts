import { AuthApi } from "../api/api/apis/AuthApi";
import { ReviewAdd, ReviewControllerApi } from "../api/api";
async function loadAllReviews() {
  const auth = new AuthApi();
  const reviews = new ReviewControllerApi();
  return auth
    .login()
    .then((result) => reviews.getAllReviews())
}
async function loadReview(id: number) {
  const auth = new AuthApi();
  const reviews = new ReviewControllerApi();
  return auth
    .login()
    .then((result) => reviews.getReviewFullInfo({ reviewId: id }))
    .then((result) => ({
      ...result,
      //   content: result?.path ? stringToHtml(result?.path) : "Loading error",
    }))
}
async function uploadReview(review: ReviewAdd) {
  const auth = new AuthApi();
  const reviews = new ReviewControllerApi();
  return auth
    .login()
    .catch((error) => console.log("Login " + error))
    .then((result) => reviews.addReview({ reviewAdd: review }, { credentials: "include" }))
    .then((result) => reviews.getAllReviews())
    .then((result) => {
      result.forEach((x) => console.log(x));
    })
    .catch((error) => console.error("Read" + error));
}
export { uploadReview, loadReview, loadAllReviews };
