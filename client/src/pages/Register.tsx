import axios, { AxiosError } from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useGlobalContext } from "../context/AppContext";

interface ApiError {
  success: boolean;
  message: string;
}

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const {
    userObject: { setIsAuthUser, setUser },
  } = useGlobalContext();

  const navigate = useNavigate();

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  // ==================================================================

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();
    setErrorMessage("");

    if (name.length <= 3) {
      toast.error("name must be more than 3 characters");
      // setErrorMessage("name must be more than 3 characters");
      setLoading(false);
      return;
    }
    if (!emailRegex.test(email)) {
      toast.error("Invalid email");
      // setErrorMessage("invalid email");
      setLoading(false);
      return;
    }
    if (password.length <= 5) {
      toast.error("Password must contain more than 5 characters");
      // setErrorMessage("Password must contain more than 5 characters");
      setLoading(false);
      return;
    }
    try {
      const response = await axios.post("http://localhost:4000/api/register", {
        name,
        email,
        password,
      });
      // console.log(response);

      if (response.data.success) {
        toast.success("User registered successfully");
        setIsAuthUser(true);
        setUser(response?.data?.user);
        localStorage.setItem(
          "currentUser",
          JSON.stringify(response?.data?.user)
        );
        navigate("/");
      } else {
        toast.error(response?.data?.message);
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const error = err as AxiosError<ApiError>;
        if (error.response) {
          setErrorMessage(error.response.data.message);
          toast.error(error.response.data.message);
        } else if (error.request) {
          setErrorMessage("No response from server. Please try again.");
          toast.error("No response from server. Please try again.");
        } else {
          setErrorMessage("An error occurred. Please try again.");
          toast.error("An error occurred. Please try again.");
        }
      } else {
        setErrorMessage("An unexpected error occurred.");
        toast.error("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  // ===============================================
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-gray-200">
      <div className="flex flex-col w-[400px] border border-black h-fit p-5 rounded-lg shadow-xl bg-slate-200">
        <h2 className="font-bold text-3xl mx-auto">Register</h2>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 *:flex *:gap-3 *:justify-between p-3 h-fit"
        >
          <div className="flex flex-col">
            <label>Name</label>
            <input
              type="text"
              placeholder="Enter name"
              onChange={(e) => setName(e.target.value)}
              className="p-2 rounded-full"
            />
          </div>
          <div className="flex flex-col">
            <label>Email</label>
            <input
              type="enail"
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
              className="p-2 rounded-full"
            />
          </div>
          <div className="flex flex-col">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter password"
              onChange={(e) => setPassword(e.target.value)}
              className="p-2 rounded-full"
            />
          </div>
          <button className="bg-blue-600 w-full p-2 rounded-full text-white hover:bg-blue-700 mt-4">
            <span className="mx-auto">
              {loading ? "Please Wait..." : "Register"}
            </span>
          </button>
        </form>
        <Link
          to={"/login"}
          className="underline cursor-pointer mt-4 text-center"
        >
          Go to login
        </Link>
        {errorMessage && (
          <span className="text-center text-red-500 mt-5">
            Registration error
          </span>
        )}
        {errorMessage && (
          <span className="text-red-500 text-center mt-5">
            {JSON.stringify(errorMessage)}
          </span>
        )}
      </div>
    </div>
  );
};

export default Register;
