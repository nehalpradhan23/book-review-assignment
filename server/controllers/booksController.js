import Book from "../models/Book.js";

export async function addBook(req, res) {
  console.log("adding book...");

  try {
    const { bookTitle, authorName, uploadedBookCoverUrl, userId } = req.body;

    // Validate required fields
    if (!bookTitle || !authorName || !uploadedBookCoverUrl) {
      return res.status(400).json({
        success: false,
        message: "All fields required",
      });
    }

    // Create new user
    const book = await Book.create({
      name: bookTitle,
      author: authorName,
      image: uploadedBookCoverUrl,
      addedBy: userId,
      reviews: [],
    });

    return res.status(201).json({
      success: true,
      message: "Book added successfully",
      book,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to add book",
      error: error.message,
    });
  }
}

export async function getAllBooks(req, res) {
  try {
    // Fetch all books from the database
    const books = await Book.find(); // You can add query parameters if needed, e.g., pagination

    return res.status(200).json({
      success: true,
      message: "Books fetched successfully",
      books,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch books",
      error: error.message,
    });
  }
}

export async function addReview(req, res) {
  try {
    const { bookId, reviewerId, username, review } = req.body;

    // Validate input
    if (!bookId || !reviewerId || !username || !review) {
      return res
        .status(400)
        .json({ success: false, message: "All fields required" });
    }

    // Find book by ID
    const book = await Book.findById(bookId);
    if (!book) {
      return res
        .status(404)
        .json({ success: false, message: "Book not found" });
    }

    // Add review to the book's reviews array
    book.reviews.push({ reviewerId, username, review });

    // Save updated book document
    await book.save();

    return res.status(201).json({
      success: true,
      message: "Review added successfully",
      book,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to add review",
      error: error.message,
    });
  }
}

export async function getBookDetails(req, res) {
  try {
    const { id } = req.params;

    // Validate input
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Book ID is required",
      });
    }

    // Find book by ID
    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    return res.status(200).json({
      success: true,
      book,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch book details",
      error: error.message,
    });
  }
}
