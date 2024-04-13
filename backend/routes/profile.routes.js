import express from 'express';
import { me } from '../controllers/profile.controller.js';
import tokenCheck from '../utils/tokenCheck.js';

const router = express.Router();

router.get('/me', tokenCheck, me);

export default router;
