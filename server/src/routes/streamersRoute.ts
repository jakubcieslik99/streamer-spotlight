import express from 'express';
import { errorHandler } from '../middlewares/errorMiddleware.js';
import { isValidId } from '../middlewares/idValidityMiddleware.js';
import { getStreamers, getStreamer, postStreamer, putStreamerVote } from '../controllers/streamersController.js';

const router = express.Router();

router.get('/streamers', errorHandler(getStreamers));
router.get('/streamer/:streamerId', isValidId('streamerId'), errorHandler(getStreamer));
router.post('/streamers', errorHandler(postStreamer));
router.put('/streamers/:streamerId/vote', isValidId('streamerId'), errorHandler(putStreamerVote));

export default router;
