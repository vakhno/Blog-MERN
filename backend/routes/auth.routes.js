import express from 'express';
import { signup, login, logout } from '../controllers/auth.controller.js';
import { signUpValidation, loginValidation } from '../validations/auth.js';

const router = express.Router();

router.post('/signup', signUpValidation, signup);
router.post('/login', loginValidation, login);
router.post('/logout', logout);
export default router;
