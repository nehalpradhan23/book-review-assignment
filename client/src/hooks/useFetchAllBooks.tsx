import { useState, useEffect } from "react";
import axios from "axios"; // If you're using axios for HTTP requests
// import { bookType } from "../types/types";
import { useGlobalContext } from "../context/AppContext";

export const useFetchBooks = () => {
  // const [books, setBooks] = useState<bookType[]>([]); // State to store fetched books
  const [loading, setLoading] = useState<boolean>(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state

  const {
    allBooksObject: { setAllBooks },
  } = useGlobalContext();

  const fetchBooks = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:4000/api/getAllBooks");
      // console.log(response);

      setAllBooks(response.data.books);
    } catch (err) {
      setError("Failed to fetch books");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []); // Empty dependency array ensures the effect only runs once on component mount

  return { loading, error, fetchBooks };
};
