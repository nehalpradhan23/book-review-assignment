import { useState } from "react";
import { useGlobalContext } from "../context/AppContext";
import { toast } from "react-toastify";
import { useAddReview } from "../hooks/useAddReview";
import { FaRegUserCircle, FaSpinner } from "react-icons/fa";
import useFetchBookDetails from "../hooks/useFetchBookDetails";

const BookReviews = ({ id }: { id: string | undefined }) => {
  const {
    currentBookDetailsObject: { currentBookDetails },
    userObject: { user },
  } = useGlobalContext();
  const { fetchBookDetails } = useFetchBookDetails();
  const { addReview, loading } = useAddReview();

  const [reviewText, setReviewText] = useState("");

  // ========================================================
  const handleAddReview = async () => {
    if (!user) {
      toast.info("Login to add a review");
      return;
    }

    if (!reviewText.trim()) {
      toast.error("Review cannot be empty");
      return;
    }

    const response = await addReview(
      currentBookDetails?._id!,
      user?.id!,
      user?.name!,
      reviewText
    );
    if (response.success) {
      toast.success("Review added successfully");
      fetchBookDetails(id!);
      setReviewText("");
    } else {
      toast.error("Error adding review");
    }
  };
  // ====================================
  return (
    <div className="my-10">
      {/* add review */}
      <h2 className="text-4xl font-semibold mt-10">Reviews</h2>
      {!user?.isAdmin && (
        <div className="my-8 flex gap-2 items-center h-[50px]">
          <input
            type="text"
            placeholder="Add review"
            className="border border-black/50 p-3 w-[500px]"
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
          />
          <button
            disabled={loading}
            onClick={handleAddReview}
            className="bg-blue-500 text-xl text-white w-[150px] text-center h-full flex items-center justify-center"
          >
            {loading ? <FaSpinner className="animate-spin" /> : "Add review"}
          </button>
        </div>
      )}
      {/* ================================================ */}
      <div className="flex flex-col bg-gray-100 p-4 mt-8">
        {/* <div className="border-b border-black/50 flex flex-col"> */}
        {currentBookDetails?.reviews?.length! > 0 ? (
          <div className="flex flex-col gap-3">
            {currentBookDetails?.reviews?.map((item, index) => (
              <div
                className="flex flex-col gap-2 border border-black/20 px-4 py-3 bg-white"
                key={index}
              >
                <div className="flex items-center gap-3 text-2xl">
                  <FaRegUserCircle />
                  <span className="text-lg font-semibold">
                    {item?.username}
                  </span>
                </div>
                <span className="text-gray-700">{item?.review}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-3xl text-center">No reviews</div>
        )}
      </div>
    </div>
    // </div>
  );
};

export default BookReviews;
