import { Router } from 'express';
import verifyToken from '../utils/verifyToken.util';
import * as memberController from '../controllers/member.controller';

const router = Router();

router.post('/create', memberController.addMember);
router.get('/get/:id', verifyToken, memberController.getMembers);
router.get('/get/purchased/:id', verifyToken, memberController.getPurchasedPackage);
router.post('/update', verifyToken, memberController.updateMember);
router.post('/delete', verifyToken, memberController.deleteMember);

export default router;
