import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import StarRating from "./StarRating";
import { useNavigate } from "react-router-dom";

export default function ReviewForm({ id, currentUser }) {
  // const [reviewsUpdated, setReviewsUpdated] = useState(false);
  const navigate = useNavigate();
  const [review, setReview] = useState({
    rating: 0,
    comment: "",
  });
  const handleReviewInputChange = (e) => {
    const { name, value } = e.target;
    setReview((review) => ({
      ...review,
      [name]: value,
    }));
  };

  const handleSumbitReview = async (e) => {
    e.preventDefault();
    if (!currentUser) {
      toast.error("Please logged into for rating...");
      navigate("/login");
      return;
    }
    try {
      await axios.post(
        `http://localhost:8080/listings/${id}/reviews`,
        { review },
        {
          withCredentials: true,
        },
      );
      toast.success("Review submitted successfully...");
      setReview({ rating: 0, comment: "" });
    } catch (err) {
      toast.error(err.message);
      console.log(err.message);
    }
  };
  return (
    <>
      <h4>Leave a Review</h4>
      <form
        noValidate
        className="needs-validation"
        onSubmit={handleSumbitReview}
      >
        <div className="mt-3 mb-3">
          <label htmlFor="rating" className="form-label">
            Rating
          </label>
          <StarRating
            rating={review.rating}
            setRating={(value) => setReview({ ...review, rating: value })}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="comment" className="form-label">
            Comments
          </label>
          <textarea
            type="range"
            cols="30"
            rows="5"
            id="comment"
            name="comment"
            className="form-control"
            onChange={handleReviewInputChange}
            value={review.comment}
            required
          ></textarea>
          <div className="valid-feedback">Comment looks good.</div>
          <div className="invalid-feedback">
            Please add some comments for review!
          </div>
        </div>
        <button className="btn btn-outline-dark">Submit</button>
      </form>
    </>
  );
}
