import { useState } from "react";
import axios from "axios";

export const useAddReview = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addReview = async (
    bookId: string,
    reviewerId: string,
    username: string,
    review: string
  ) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post("http://localhost:4000/api/addReview", {
        bookId,
        reviewerId,
        username,
        review,
      });

      if (response.data.success) {
        return { success: true, book: response.data.book };
      } else {
        throw new Error(response.data.message);
      }
    } catch (err) {
      console.log(err);
      setError("Failed to add review");
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  return { addReview, loading, error };
};
