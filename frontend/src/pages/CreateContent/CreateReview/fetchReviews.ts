import { AuthApi } from "../../../api/api/apis/AuthApi";
import { ReviewAdd, ReviewControllerApi } from "../../../api/api";
async function loadReview(id: number) {
  const auth = new AuthApi();
  const reviews = new ReviewControllerApi();
  return auth
    .login()
    .then((result) => reviews.getReviewFullInfo({ reviewId: id }))
    .catch((error) => console.error("Read" + error))
    .then((result) => ({
      ...result,
      //   content: result?.path ? stringToHtml(result?.path) : "Loading error",
    }))
    .catch((error) => console.error("Login " + error));
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
export { uploadReview, loadReview };
