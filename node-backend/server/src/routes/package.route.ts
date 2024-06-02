import { Router } from 'express';
import verifyToken from '../utils/verifyToken.util';
import * as packageController from '../controllers/package.controller';

const router = Router();

router.post('/package/create', verifyToken, packageController.createPackage);
router.post('/package/update', verifyToken, packageController.updatePackage);
router.post('/package/read', verifyToken, packageController.readPackage);
router.post('/package/delete', verifyToken, packageController.deletePackage);

export default router;
