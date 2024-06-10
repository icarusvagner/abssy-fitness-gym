import { Router } from 'express';
import verifyToken from '../utils/verifyToken.util';
import * as announcementController from '../controllers/announcement.controller';

const router = Router();

router.post('/create', verifyToken, announcementController.createAnnouncement);
router.get('/get/:id', verifyToken, announcementController.getAnnouncement);
router.post('/update', verifyToken, announcementController.updateAnnouncement);
router.post('/delete', verifyToken, announcementController.deleteAnnouncement);

export default router;
