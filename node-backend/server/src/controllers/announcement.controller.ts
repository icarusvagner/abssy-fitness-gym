import { Request, Response, NextFunction } from "express";
import { AnnouncementForCreate, AnnouncementForUpdate } from '../models/announcement.model';
import * as announcementService from '../services/announcement.service';

const createAnnouncement = async (req: Request, res: Response) => {
  try {
    let announcement: AnnouncementForCreate = req.body;
    let result = await announcementService.create_announcement(announcement);

    return res.status(201).json({ result });
  } catch (error: any) {
    console.error('Creating announcement error on controller: ', error);
    return res.status(500).json({ 'error': error.message });
  }
}

const updateAnnouncement = async (req: Request, res: Response) => {
  try {
    let announcement: AnnouncementForUpdate = req.body;
    let result = await announcementService.update_announcement(announcement);

    return res.status(200).json({ result });
  } catch (error: any) {
    console.error('Updating announcement error on controller: ', error);
    return res.status(500).json({ 'error': error.message });
  }
}

const getAnnouncement = async (req: Request, res: Response) => {
  try {
    let { id } = req.params;
    let result = await announcementService.get_announcement(parseInt(id));

    return res.status(200).json({ result });
  } catch (error: any) {
    console.error('Getting announcement error on controller: ', error);
    return res.status(500).json({ 'error': error.message });
  }
}

const deleteAnnouncement = async (req: Request, res: Response) => {
  try {
    let { id } = req.body;
    let result = await announcementService.delete_announcement(parseInt(id));

    return res.status(200).json({ result });
  } catch (error: any) {
    console.error('Deleting announcement error on controller: ', error);
    return res.status(500).json({ 'error': error.message });
  }
}

export {
  createAnnouncement,
  getAnnouncement,
  updateAnnouncement,
  deleteAnnouncement
}
