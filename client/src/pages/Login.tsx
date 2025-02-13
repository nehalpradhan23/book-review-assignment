import axios, { AxiosError } from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useGlobalContext } from "../context/AppContext";

interface ApiError {
  success: boolean;
  message: string;
}

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  );

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const {
    userObject: { setUser, setIsAuthUser },
  } = useGlobalContext();

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  // ==================================================
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);

    e.preventDefault();
    if (email.length === 0) {
      toast.error("Enter email");
      // setErrorMessage("Enter email");
      setLoading(false);
      return;
    }
    if (!emailRegex.test(email)) {
      toast.error("invalid email");
      // setErrorMessage("invalid email");
      setLoading(false);
      return;
    }
    if (password.length === 0) {
      toast.error("Enter Password");
      // setErrorMessage("Enter Password");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post("http://localhost:4000/api/login", {
        email,
        password,
      });

      console.log("login: ", response);

      if (response.data.success) {
        setIsAuthUser(true);
        setUser(response?.data?.user);
        toast.success("Login successful");
        localStorage.setItem(
          "currentUser",
          JSON.stringify(response?.data?.user)
        );
        navigate("/");
      } else {
        toast.error(response.data.message);
        setErrorMessage(response.data.message);
      }
    } catch (err) {
      console.log("error: ", err);
      if (axios.isAxiosError(err)) {
        const error = err as AxiosError<ApiError>;
        if (error.response) {
          toast.error(error.response.data.message);
          // setErrorMessage(error.response.data.message);
        } else if (error.request) {
          toast.error("No response from server. Please try again.");
          // setErrorMessage("No response from server. Please try again.");
        } else {
          toast.error("An error occurred. Please try again.");
          // setErrorMessage("An error occurred. Please try again.");
        }
      } else {
        toast.error("An unexpected error occurred.");
        // setErrorMessage("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  // ================================================================
  return (
    <div className="w-full flex items-center justify-center bg-gray-100 h-screen">
      <div className="flex flex-col w-[400px] border border-black/50 h-fit p-5 rounded-lg shadow-2xl bg-slate-200">
        <h2 className="font-bold text-3xl mx-auto">Login</h2>
        <form
          onSubmit={handleSubmit}
          className="flex flex-1 flex-col gap-4 *:flex *:gap-3 *:justify-between p-3 h-fit"
        >
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
              {loading ? "Logging in..." : "Login"}
            </span>
          </button>
        </form>
        <Link
          to={"/register"}
          className="underline cursor-pointer mt-4 text-center"
        >
          Go to Register
        </Link>
        {errorMessage && (
          <span className="text-red-500">{JSON.stringify(errorMessage)}</span>
        )}
      </div>
    </div>
  );
};

export default Login;
