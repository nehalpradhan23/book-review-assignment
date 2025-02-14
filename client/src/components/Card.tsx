import { Link } from "react-router-dom";
import { bookType } from "../types/types";

const Card = ({ book }: { book: bookType }) => {
  // const {
  //   currentBookDetailsObject: { setCurrentBookDetails },
  // } = useGlobalContext();
  // const navigate = useNavigate();

  // const handleShowBookDetails = () => {
  //   setCurrentBookDetails(book);
  //   navigate(`/book/${book?._id}`);
  // };
  // =========================
  return (
    <div className="flex gap-2 flex-col border border-black/30 w-[330px] h-[400px] rounded-md overflow-hidden bg-gray-100">
      <div className="flex flex-col h-full">
        {/* image --------------- */}
        <div className="h-[70%] bg-gray-200 overflow-hidden">
          <img src={book?.image} alt="" />
        </div>
        <div className="p-2 flex flex-col h-[100px]">
          <span className="text-lg line-clamp-2 font-semibold">
            {book.name}
          </span>
          <span className="text-base line-clamp-1">Author: {book?.author}</span>
          {/* <div className="flex gap-5">
            <span className="text-base">Rating:</span>
            <span>stars</span>
          </div> */}
        </div>
        <Link
          to={`/book/${book?._id}`}
          // onClick={handleShowBookDetails}
          className="text-lg font-semibold py-1.5 hover:bg-blue-300 transition-all border-t border-black/10 text-center"
        >
          Details
        </Link>
      </div>
    </div>
  );
};

export default Card;
