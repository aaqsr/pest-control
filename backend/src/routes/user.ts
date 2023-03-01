import express from 'express';
import { loginUser, signUpUser } from '../controllers/userController';
import user from '../models/user';

export const router = express.Router();

// login route
router.post('/login', loginUser);

// sign up route
router.post('/signup', signUpUser);

// router.get('/', async (req, res) => {res.status(200).send(await user.find({}))})

export default router;