import { Request, Response, NextFunction } from "express";
import * as dashboardService from "../services/dashboard.service";

const getDashboard = async (req: Request, res: Response) => {
  try {
    let { id } = req.params;
    let result = await dashboardService.get_dashboard();

    return res.status(200).json({ result });
  } catch (error: any) {
    console.error("Getting dashboard error on controller: ", error);
    return res.status(500).json({ error: error.message });
  }
};

const getMembersPerMonth = async (req: Request, res: Response) => {
  try {
    let { id } = req.params;
    let result = await dashboardService.get_members_month();

    return res.status(200).json({ result });
  } catch (error: any) {
    console.error("Getting members per month error on controller: ", error);
    return res.status(500).json({ error: error.message });
  }
};

export { getDashboard, getMembersPerMonth };
