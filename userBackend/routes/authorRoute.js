import express from 'express';
const router = express.Router();
import{
  deleteAuthor, 
 filterAuthor,
 getAuthors, 
 postAuthor, 
 updateAuthors 
} 
 from "../Controllers/authorController.js";

// Post
router.post('/new',postAuthor);
// Get
router.get('/all',getAuthors);
// Update
router.put("/update/:id",updateAuthors);
// Delete
router.delete("/delete/:id",deleteAuthor)
// Filter
router.get("/filter/:id",filterAuthor)
export default router;