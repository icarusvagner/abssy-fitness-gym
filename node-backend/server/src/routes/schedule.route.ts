import { Router } from 'express';
import verifyToken from '../utils/verifyToken.util';
import * as schedController from '../controllers/schedule.controller';

const router = Router();

router.post('/create', schedController.createSchedule);
router.get('/get/:id', schedController.getSchedules);
router.post('/update', schedController.updateSchedule);
router.post('/delete', schedController.deleteSchedule);

export default router;
