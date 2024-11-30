import { Router } from "express";
import verifyToken from "../utils/verifyToken.util";
import * as memberController from "../controllers/member.controller";

const router = Router();

router.post("/create", memberController.addMember);
router.post("/verify-change", memberController.verify_change_pass);
router.get("/get/:id", verifyToken, memberController.getMembers);
router.get(
  "/check-verified-email/:email",
  memberController.check_verified_email,
);
router.get(
  "/get/purchased/:id",
  verifyToken,
  memberController.getPurchasedPackage,
);
router.post("/update", verifyToken, memberController.updateMember);
router.post("/delete", verifyToken, memberController.deleteMember);
router.post("/login", memberController.login_member);
router.post("/renew", memberController.renew_member_package);
router.post("/upgrade", memberController.upgrade_member_package);
router.post("/after-login", verifyToken, memberController.get_member_details);
router.post("/after-login", verifyToken, memberController.get_member_details);
router.post("/after-login", verifyToken, memberController.get_member_details);
router.get("/one", verifyToken, memberController.get_one_member_details);

export default router;
