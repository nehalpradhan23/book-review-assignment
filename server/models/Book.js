import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  username: { type: String, required: true }, // Store reviewer's username
  review: { type: String, required: true }, // Store the review text
  createdAt: { type: Date, default: Date.now }, // Timestamp for when the review was added
});

const bookSchema = new mongoose.Schema({
  name: { type: String, required: true },
  author: { type: String, required: true },
  image: { type: String }, // URL for book cover image
  addedBy: { type: String },
  reviews: [reviewSchema], // Array of reviews
});

const Book = mongoose.models.Book || mongoose.model("Book", bookSchema);
export default Book;
