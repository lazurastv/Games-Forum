import { AuthApi } from "../../../api/api/apis/AuthApi";
import { ReviewAddUpdate, ReviewControllerApi } from "../../../api/api";
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
async function uploadReview(review: ReviewAddUpdate) {
  const auth = new AuthApi();
  const reviews = new ReviewControllerApi();
  return auth
    .login()
    .catch((error) => console.log("Login " + error))
    .then((result) =>
      reviews.addReview({ reviewAddUpdate: review }, { credentials: "include" })
    )
    .catch((error) => console.error("Add " + error))
    // .then((result) => reviews.getAllReviews())
    // .then((result) => {
    //   result.forEach((x) => console.log(x));
    // })
    // .catch((error) => console.error("Read" + error));
}
export { uploadReview, loadReview };
