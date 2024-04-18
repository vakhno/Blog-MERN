import express from 'express';
// import { createTagValidation } from '../validations/tag.js';
import { sendTags, getAllTags, getPopularTags } from '../controllers/tag.controller.js';
const router = express.Router();

router.post('/tag', sendTags);
router.get('/tag', getAllTags);
router.get('/populartag', getPopularTags);

export default router;
