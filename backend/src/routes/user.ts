import express from 'express';
import { loginUser, signUpUser } from '../controllers/userController';

export const router = express.Router();

// login route
router.post('/login', loginUser);

// sign up route
router.post('/signup', signUpUser);
