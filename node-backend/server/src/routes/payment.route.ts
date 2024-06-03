import { Router } from 'express';
import verifyToken from '../utils/verifyToken.util';
import * as paymentController from '../controllers/payment.controller';

const router = Router();

router.post('/create', verifyToken, paymentController.createPayment);
router.get('/get/:id', verifyToken, paymentController.readPayment);
router.post('/update', verifyToken, paymentController.updatePayment);
router.post('/delete', verifyToken, paymentController.deletePayment);

export default router;
