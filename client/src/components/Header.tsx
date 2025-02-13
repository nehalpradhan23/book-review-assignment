import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="flex items-center justify-between py-5 px-5 md:px-10 shadow-md fixed w-full bg-white">
      <h1 className="text-3xl lg:text-4xl font-semibold">Book review app</h1>
      <Link
        to={"/login"}
        className="bg-blue-500 rounded-full text-xl text-white px-4 flex items-center justify-center py-1 md:py-2 h-fit"
      >
        Login
      </Link>
    </div>
  );
};

export default Header;
