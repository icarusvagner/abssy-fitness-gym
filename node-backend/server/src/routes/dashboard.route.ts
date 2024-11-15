import { Router } from "express";
import verifyToken from "../utils/verifyToken.util";
import * as dashboardController from "../controllers/dashboard.controller";

const router = Router();

router.get("/get/dashboard", dashboardController.getDashboard);
router.get("/get/members-per-month", dashboardController.getMembersPerMonth);

export default router;
