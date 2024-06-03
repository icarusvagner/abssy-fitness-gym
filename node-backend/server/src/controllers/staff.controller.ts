import { Request, Response, NextFunction } from "express";
import { StaffForUpdate } from '../models/staff.model';
import * as staffService from '../services/staff.service';

const updateStaff = async (req: Request, res: Response) => {
  try {
    let staff: StaffForUpdate = req.body;
    let result = await staffService.update_staff(staff);

    return res.status(200).json({ result });
  } catch (error: any) {
    console.error('Updating staff error on controller: ', error);
    return res.status(500).json({ 'error': error.message });
  }
}

const readStaff = async (req: Request, res: Response) => {
  try {
    let { id } = req.params;
    let result = await staffService.read_staff(parseInt(id));

    return res.status(200).json({ result });
  } catch (error: any) {
    console.error('Reading staff error on controller: ', error);
    return res.status(500).json({ 'error': error.message });
  }
}

const deleteStaff = async (req: Request, res: Response) => {
  try {
    let { id } = req.body;
    let result = await staffService.delete_staff(parseInt(id));

    return res.status(200).json({ result });
  } catch (error: any) {
    console.error('Deleting staff error on controller: ', error);
    return res.status(500).json({ 'error': error.message });
  }
}

export {
  updateStaff,
  readStaff,
  deleteStaff,
}
