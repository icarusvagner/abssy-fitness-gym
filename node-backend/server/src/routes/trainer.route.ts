import { Router } from 'express';
import verifyToken from '../utils/verifyToken.util';
import * as trainerController from '../controllers/trainer.controller';

const router = Router();

router.post('/create', verifyToken, trainerController.createTrainer);
router.get('/get/:id', verifyToken, trainerController.readTrainer);
router.post('/update', verifyToken, trainerController.updateTrainer);
router.post('/delete', verifyToken, trainerController.deleteTrainer);

export default router;
