import express from "express";
import {
  addBook,
  addReview,
  getAllBooks,
  getBookDetails,
} from "../controllers/booksController.js";

const bookRouter = express.Router();

bookRouter.post("/addBook", addBook);
bookRouter.get("/getAllBooks", getAllBooks);
bookRouter.post("/addReview", addReview);
bookRouter.get("/bookDetails/:id", getBookDetails);

export default bookRouter;
