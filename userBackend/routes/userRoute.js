import express from 'express';
const routes = express.Router();
import { verifyToken } from '../Middleware/authMiddleware.js'
import { getCurrentUser } from '../Controllers/userController.js';
import { getAllUsers, getUserProfile, login, registerUser, findUser, updateUserRole, deleteUser } from '../Controllers/userController.js';
// Post
routes.post('/register',registerUser);
// Post
routes.post('/login',login)

// Get
routes.get('/all',getAllUsers);

routes.get('/profile', verifyToken, getUserProfile);

routes.get('/me', verifyToken, getCurrentUser);


// find
routes.get('/find/:id',findUser)

// Update
routes.put('/update/:id',updateUserRole);

// Delete
routes.delete('/delete/:id',deleteUser);


export default routes;