import express from "express";
const router = express.Router();

import {
  postNewBooks,
  getAllBooks,
  putBooks,
  deleteBooks,
  findBooks,
} from "../Controllers/booksController.js";

// Post
router.post("/new",postNewBooks);
// Get
router.get("/all",getAllBooks);
// Put
router.put("/update/:id",putBooks);
// Delete
router.delete("/delete/:id",deleteBooks);
// Find
router.get("/find/:id",findBooks);

export default router;