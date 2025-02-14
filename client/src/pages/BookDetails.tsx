import { useParams } from "react-router-dom";
import BookReviews from "../components/BookReviews";
import { useGlobalContext } from "../context/AppContext";
import { useEffect } from "react";
import useFetchBookDetails from "../hooks/useFetchBookDetails";

const BookDetails = () => {
  const { id } = useParams();

  const {
    currentBookDetailsObject: { currentBookDetails },
  } = useGlobalContext();

  const { fetchBookDetails } = useFetchBookDetails();

  console.log(currentBookDetails);

  useEffect(() => {
    if (id) {
      fetchBookDetails(id);
    }
  }, [id]);

  // ===================================
  return (
    <div className="flex flex-col max-2xl:mx-6 2xl:max-w-[1500px] mx-auto mt-12 gap-10">
      <h1 className="text-5xl font-semibold">Book Details</h1>
      <div className="flex flex-col lg:flex-row mt-8">
        <div className="h-[500px] lg:w-[40%] w-full flex items-center justify-center">
          <img src={currentBookDetails?.image} alt="" />
        </div>
        <div className="flex flex-col p-4 bg-gray-100 gap-5 max-lg:mt-5">
          <span className="text-5xl">{currentBookDetails?.name}</span>
          <span className="text-3xl">{currentBookDetails?.author}</span>
        </div>
      </div>
      <BookReviews id={id} />
    </div>
  );
};

export default BookDetails;
