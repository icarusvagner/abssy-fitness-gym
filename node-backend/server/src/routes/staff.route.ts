import { Router } from 'express';
import verifyToken from '../utils/verifyToken.util';
import * as staffController from '../controllers/staff.controller';

const router = Router();

router.post('/update', staffController.updateStaff);
router.get('/get/:id', staffController.readStaff);
router.post('/delete', staffController.deleteStaff);

export default router;
