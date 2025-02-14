import { Link } from "react-router-dom";
import BooksList from "../components/BooksList";
import { FaArrowRight } from "react-icons/fa";
import { useGlobalContext } from "../context/AppContext";

const Home = () => {
  const {
    userObject: { user },
  } = useGlobalContext();
  console.log(user);

  // --------------------------------------------
  return (
    <div className="flex flex-col max-2xl:mx-6 2xl:max-w-[1500px] mx-auto">
      <div className="my-10">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl md:text-4xl font-semibold text-gray-700">
            Featured
          </h1>
          {user?.isAdmin ? (
            <Link
              to={"/books"}
              className="text-2xl bg-green-500 hover:bg-green-600 px-4 py-2 rounded-full text-white flex gap-2 items-center justify-center"
            >
              Manage books
              <FaArrowRight />
            </Link>
          ) : (
            <Link
              to={"/books"}
              className="text-2xl bg-green-500 hover:bg-green-600 px-4 py-2 rounded-full text-white flex gap-2 items-center justify-center"
            >
              Explore all books
              <FaArrowRight />
            </Link>
          )}
        </div>
        <div className="mt-20">
          <BooksList />
        </div>
      </div>
    </div>
  );
};

export default Home;
