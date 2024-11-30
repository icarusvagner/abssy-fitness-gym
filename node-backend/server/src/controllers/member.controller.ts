import { Request, Response, NextFunction } from "express";
import {
  MemberForCreate,
  MemberForUpdate,
  MemberRenewPackage,
  MemberUpgradePackage,
} from "../models/member.model";
import * as memberService from "../services/member.service";

const addMember = async (req: Request, res: Response) => {
  try {
    let member: MemberForCreate = req.body;
    let result = await memberService.add_member(member);

    return res.status(200).json({ result });
  } catch (error: any) {
    console.error("Adding member error on controller: ", error);
    return res.status(500).json({ error: error.message });
  }
};

const getMembers = async (req: Request, res: Response) => {
  try {
    let { id } = req.params;
    let result = await memberService.get_members(parseInt(id));

    return res.status(200).json({ result });
  } catch (error: any) {
    console.error("Getting members error on controller: ", error);
    return res.status(500).json({ error: error.message });
  }
};

const updateMember = async (req: Request, res: Response) => {
  try {
    let member: MemberForUpdate = req.body;
    let result = await memberService.update_member(member);

    return res.status(200).json({ result });
  } catch (error: any) {
    console.error("Updating member error on controller: ", error);
    return res.status(500).json({ error: error.message });
  }
};

const deleteMember = async (req: Request, res: Response) => {
  try {
    let { id } = req.body;
    let result = await memberService.delete_member(parseInt(id));

    return res.status(200).json({ result });
  } catch (error: any) {
    console.error("Deleting member error on controller: ", error);
    return res.status(500).json({ error: error.message });
  }
};
const getPurchasedPackage = async (req: Request, res: Response) => {
  try {
    let { id } = req.body;
    let result = await memberService.get_purchased_package(parseInt(id));

    return res.status(200).json({ result });
  } catch (error: any) {
    console.error("Getting purchased package error on controller: ", error);
    return res.status(500).json({ error: error.message });
  }
};

const verify_change_pass = async (req: Request, res: Response) => {
  try {
    let { email, username, password, reference_no, purchased_id, package_id } =
      req.body;
    let result = await memberService.verify_change_pass(
      email,
      username,
      password,
      reference_no,
      purchased_id,
      package_id,
    );

    return res.status(200).json({ result });
  } catch (error: any) {
    console.error("Verifi and change pass error on controller: ", error);
    return res.status(500).json({ error: error.message });
  }
};

const check_verified_email = async (req: Request, res: Response) => {
  try {
    let { email } = req.params;
    let result = await memberService.checkIfVerified(email);

    return res.status(200).json({ result });
  } catch (error: any) {
    console.error(
      "Checking verified email error on controller: ",
      error.message,
    );
    return res.status(500).json({ error: error.message });
  }
};

const login_member = async (req: Request, res: Response) => {
  try {
    let { username, password } = req.body;
    let result = await memberService.login_member(username, password);

    return res.status(200).json({ result });
  } catch (error: any) {
    console.error("Logging in member error on controller: ", error.message);
    return res.status(500).json({ error: error.message });
  }
};

const get_member_details = (req: Request, res: Response) => {
  try {
    console.log(req);
    return { test: "success" };
  } catch (error: any) {
    console.error(
      "Getting member details error on controller: ",
      error.message,
    );
    return res.status(500).json({ error: error.message });
  }
};

const get_one_member_details = async (req: Request, res: Response) => {
  try {
    const { user } = req.body;
    let result = await memberService.get_one_member_details(user["username"]);
    return res.status(200).json({ result });
  } catch (error: any) {
    console.error(
      "Getting one member details error on controller: ",
      error.message,
    );
    return res.status(500).json({ error: error.message });
  }
};

const upgrade_member_package = async (req: Request, res: Response) => {
  try {
    const member_update: MemberUpgradePackage = req.body;
    let result = await memberService.upgrade_member_package(member_update);
    return res.status(201).json({ result });
  } catch (error: any) {
    console.error(
      "Upgrade member packager error on controller: ",
      error.message,
    );
    return res.status(500).json({ error: error.message });
  }
};

const renew_member_package = async (req: Request, res: Response) => {
  try {
    const member_renew: MemberRenewPackage = req.body;
    let result = await memberService.renew_member_package(member_renew);
    return res.status(201).json({ result });
  } catch (error: any) {
    console.error(
      "Renewing member packager error on controller: ",
      error.message,
    );
    return res.status(500).json({ error: error.message });
  }
};

export {
  get_one_member_details,
  get_member_details,
  login_member,
  check_verified_email,
  verify_change_pass,
  addMember,
  getMembers,
  updateMember,
  deleteMember,
  getPurchasedPackage,
  renew_member_package,
  upgrade_member_package,
};
