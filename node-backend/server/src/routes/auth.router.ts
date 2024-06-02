import { Router } from 'express';
import verifyToken from '../utils/verifyToken.util';
import * as authController from '../controllers/auth.controller';

const router = Router();

router.post('/login', authController.loginUser);

router.post('/register/staff', verifyToken, authController.registerStaff);
router.post('/register/admin', verifyToken, authController.registerAdmin);
router.post('/logout', verifyToken, authController.logoutUser);
router.post('/change/password', verifyToken, authController.changePassword)

export default router;
