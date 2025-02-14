import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import UserProfile from "./pages/UserProfile";
import BookDetails from "./pages/BookDetails";
import BookListings from "./pages/BookListings";
import SubmitBookReview from "./pages/SubmitBookReview";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Header from "./components/Header";
import { ToastContainer } from "react-toastify";
import { useGlobalContext } from "./context/AppContext";
import { useEffect } from "react";
import AddBookModal from "./components/AddBookModal";

function App() {
  // const [loading, setLoading] = useState(true);
  const {
    userObject: { setIsAuthUser, setUser },
    addBookModalOpenObject: { addBookModalOpen },
  } = useGlobalContext();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("currentUser");
    // console.log("====", isLoggedIn);

    if (isLoggedIn) {
      setIsAuthUser(true);
      setUser(JSON.parse(isLoggedIn));
    }
    // setLoading(false);
  }, []);

  // if (loading) return;
  // ============================================
  return (
    <div className="">
      <ToastContainer position="top-center" />
      <div className="relative">
        <Header />
        <div className="pt-20">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/books" element={<BookListings />} />
            <Route path="/book/:id" element={<BookDetails />} />
            {/* <Route path="/book/details" element={<BookDetails />} /> */}
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/review" element={<SubmitBookReview />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      </div>
      {addBookModalOpen && <AddBookModal />}
    </div>
  );
}

export default App;
