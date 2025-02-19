import express from 'express';
import * as lotteryController from '../controllers/lotteryController.js';

const router = express.Router();

router.post('/', lotteryController.createLotteryController);
router.get('/', lotteryController.getLotteriesController);
router.get('/search', lotteryController.searchLotteryByDescriptionController);
router.get('/:id', lotteryController.getLotteryByIdController);
router.put('/:id', lotteryController.updateLotteryController);
router.delete('/:id', lotteryController.deleteLotteryController);

export default router;