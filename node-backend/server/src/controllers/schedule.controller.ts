import { Request, Response, NextFunction } from "express";
import { ScheduleForCreate, ScheduleForUpdate } from '../models/schedule.model';
import * as schedService from '../services/schedule.service';

const createSchedule = async (req: Request, res: Response) => {
  try {
    let sched: ScheduleForCreate = req.body;
    let result = await schedService.create_schedule(sched);

    return res.status(201).json({ result });
  } catch (error: any) {
    console.error('Createing schedule error on controller: ', error);
    return res.status(500).json({ 'error': error.message });
  }
}

const getSchedules = async (req: Request, res: Response) => {
  try {
    let { id } = req.params;
    let result = await schedService.get_schedules(parseInt(id));
    return res.status(200).json({ result });
  } catch (error: any) {
    console.error('Getting schedules error on controller: ', error);
    return res.status(500).json({ 'error': error.message });
  }
}

const updateSchedule = async (req: Request, res: Response) => {
  try {
    let sched: ScheduleForUpdate = req.body;
    let result = await schedService.update_schedule(sched);
    return res.status(200).json({ result });
  } catch (error: any) {
    console.error('Updating schedules error on controller: ', error);
    return res.status(500).json({ 'error': error.message });
  }
}

const deleteSchedule = async (req: Request, res: Response) => {
  try {
    let { id } = req.body;
    let result = await schedService.delete_schedule(id);

    return res.status(200).json({ result });
  } catch (error: any) {
    console.error('Deleting schedules error on controller: ', error);
    return res.status(500).json({ 'error': error.message });
  }
}

export {
  createSchedule,
  getSchedules,
  updateSchedule,
  deleteSchedule,
}
