import express from 'express';
import { signup, login } from '../controllers/auth.controller.js';
import { signUpValidation, loginValidation } from '../validations/auth.js';

const router = express.Router();

router.post('/signup', signUpValidation, signup);
router.post('/login', loginValidation, login);
export default router;
