import { Link } from "react-router-dom";

const Card = () => {
  return (
    <div className="flex gap-2 flex-col border border-black/30 w-[330px] h-[400px] rounded-md overflow-hidden bg-gray-100">
      <div className="flex flex-col h-full">
        {/* image --------------- */}
        <div className="h-[80%] bg-gray-400">image</div>
        <div className="p-2 flex flex-col">
          <span className="text-xl">Title</span>
          <span className="text-lg">author</span>
          <div className="flex gap-5">
            <span className="text-base">Rating:</span>
            <span>stars</span>
          </div>
        </div>
      </div>
      <Link
        to={`/book/${20}`}
        className="text-lg font-semibold py-1.5 hover:bg-blue-300 transition-all border-t border-black/10 text-center"
      >
        Details
      </Link>
    </div>
  );
};

export default Card;
