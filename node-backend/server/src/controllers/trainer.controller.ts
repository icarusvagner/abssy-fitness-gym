import { Request, Response, NextFunction } from "express";
import { TrainerForCreate, TrainerForUpdate } from '../models/trainer.model';
import * as trainerService from '../services/trainers.service';

const createTrainer = async (req: Request, res: Response) => {
  try {
    let trainer: TrainerForCreate = req.body;
    let result = await trainerService.create_trainer(trainer);

    return res.status(201).json({ result });
  } catch (error: any) {
    console.error('Creating trainer error on controller: ', error);
    return res.status(500).json({ 'error': error.message });
  }
}

const updateTrainer = async (req: Request, res: Response) => {
  try {
    let trainer: TrainerForUpdate = req.body;
    let result = await trainerService.update_trainer(trainer);

    return res.status(200).json({ result });
  } catch (error: any) {
    console.error('Updating trainer error on controller: ', error);
    return res.status(500).json({ 'error': error.message });
  }
}

const readTrainer = async (req: Request, res: Response) => {
  try {
    let { id } = req.params;
    let result = await trainerService.read_trainer(parseInt(id));

    return res.status(200).json({ result });
  } catch (error: any) {
    console.error('Reading trainer error on controller: ', error);
    return res.status(500).json({ 'error': error.message });
  }
}

const deleteTrainer = async (req: Request, res: Response) => {
  try {
    let { id } = req.body;
    let result = await trainerService.delete_trainer(parseInt(id));

    return res.status(200).json({ result });
  } catch (error: any) {
    console.error('Deleting trainer error on controller: ', error);
    return res.status(500).json({ 'error': error.message });
  }
}

export {
  createTrainer,
  readTrainer,
  updateTrainer,
  deleteTrainer,
}
