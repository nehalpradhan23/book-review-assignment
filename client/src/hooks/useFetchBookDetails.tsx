import { useState } from "react";
// import { useParams } from "react-router-dom";
import axios from "axios";
import { useGlobalContext } from "../context/AppContext";

interface Review {
  username: string;
  review: string;
}

interface Book {
  _id: string;
  name: string;
  author: string;
  image: string;
  reviews: Review[];
}

const useFetchBookDetails = () => {
  // const { id } = useParams(); // Get book ID from URL
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const {
    currentBookDetailsObject: { setCurrentBookDetails },
  } = useGlobalContext();

  const fetchBookDetails = async (id: string) => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/bookDetails/${id}`
      );
      setBook(response.data.book);
      setCurrentBookDetails(response.data.book);
    } catch (error) {
      setError("Error fetching book details");
      console.error("Error fetching book details:", error);
    } finally {
      setLoading(false);
    }
  };

  return { book, loading, error, fetchBookDetails };
};

export default useFetchBookDetails;
