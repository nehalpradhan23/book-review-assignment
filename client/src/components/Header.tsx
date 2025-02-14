import { Link } from "react-router-dom";
import { useGlobalContext } from "../context/AppContext";
import { toast } from "react-toastify";
import { FaUserCircle } from "react-icons/fa";

const Header = () => {
  const {
    userObject: { isAuthUser, setIsAuthUser, setUser, user },
  } = useGlobalContext();

  // const
  // ========================================
  return (
    <div className="z-10 flex items-center justify-between py-5 px-5 md:px-10 shadow-md fixed w-full bg-white">
      <Link to={"/"} className="text-3xl lg:text-4xl font-semibold">
        Book review app
      </Link>

      {isAuthUser ? (
        // if logged in --------------------------------
        <div className="flex gap-5 items-center">
          <Link
            to={"/profile"}
            className="bg-gray-200 rounded-full text-3xl text-black flex items-center justify-center hover:bg-gray-300 gap-2 px-3 py-2"
          >
            <FaUserCircle />
            <span className="text-xl">{user?.name}</span>
          </Link>
          <button
            onClick={() => {
              localStorage.removeItem("currentUser");
              setIsAuthUser(false);
              setUser(null);
              toast.info("Logged out");
            }}
            className="bg-blue-500 rounded-full text-xl text-white px-4 flex items-center justify-center py-1 md:py-2 h-fit"
          >
            Logout
          </button>
        </div>
      ) : (
        <Link
          to={"/login"}
          className="bg-blue-500 rounded-full text-xl text-white px-4 flex items-center justify-center py-1 md:py-2 h-fit"
        >
          Login
        </Link>
      )}
    </div>
  );
};

export default Header;
