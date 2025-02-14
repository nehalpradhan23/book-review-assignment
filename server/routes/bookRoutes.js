import express from "express";
import { addBook, getAllBooks } from "../controllers/booksController.js";

const bookRouter = express.Router();

bookRouter.post("/addBook", addBook);
bookRouter.get("/getAllBooks", getAllBooks);

export default bookRouter;
