import { Router } from 'express';
import verifyToken from '../utils/verifyToken.util';
import * as inventoryController from '../controllers/inventory.controller';

const router = Router();

router.post('/create', verifyToken, inventoryController.insertInventory);
router.post('/update', verifyToken, inventoryController.updateInventory);
router.post('/get', verifyToken, inventoryController.selectInventory);
router.get('/log', verifyToken, inventoryController.selectInventoryLog);

export default router;
