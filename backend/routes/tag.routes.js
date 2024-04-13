import express from 'express';
// import { createTagValidation } from '../validations/tag.js';
import { sendTags, getAllTags } from '../controllers/tag.controller.js';
const router = express.Router();

router.post('/tag', sendTags);
router.get('/tag', getAllTags);

export default router;
