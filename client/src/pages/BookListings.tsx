import { FaPlus } from "react-icons/fa";
import BooksList from "../components/BooksList";
import { useGlobalContext } from "../context/AppContext";
import { useEffect, useState } from "react";
import { useFetchBooks } from "../hooks/useFetchAllBooks";
import { bookType } from "../types/types";

const BookListings = () => {
  const {
    userObject: { user },
    addBookModalOpenObject: { setAddBookModalOpen },
    allBooksObject: { allBooks },
  } = useGlobalContext();

  const [searchText, setSearchText] = useState("");
  const [filteredBooks, setFilteredBooks] = useState<bookType[] | []>([]);

  const { fetchBooks } = useFetchBooks();

  useEffect(() => {
    fetchBooks();
  }, []);

  useEffect(() => {
    if (searchText.length === 0) {
      setFilteredBooks(allBooks);
    }
    if (searchText.length > 0) {
      const filteredBooks = allBooks.filter((book) =>
        book.name.toLowerCase().includes(searchText)
      );
      setFilteredBooks(filteredBooks);
    }
  }, [searchText]);
  // --------------------------------------------
  return (
    <div className="flex flex-col max-2xl:mx-6 2xl:max-w-[1500px] mx-auto">
      <div className="my-10 flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <h1 className="text-6xl font-semibold">All books</h1>
          {user?.isAdmin && (
            <button
              onClick={() => setAddBookModalOpen(true)}
              className="text-2xl flex items-center h-fit gap-3 font-semibold bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600"
            >
              Add book
              <FaPlus />
            </button>
          )}
        </div>
        {/* search and filter */}
        <div className="flex items-center gap-4 mt-10">
          <input
            className="w-[400px] border p-3 border-black/30 rounded-md"
            type="text"
            placeholder="Search"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          {/* <button>filters</button> */}
        </div>
        <div className="mt-14">
          <BooksList books={filteredBooks} />
        </div>
      </div>
    </div>
  );
};

export default BookListings;
