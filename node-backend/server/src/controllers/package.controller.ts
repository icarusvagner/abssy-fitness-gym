import { Request, Response, NextFunction } from "express";
import { PackageDate, PackageForCreate, PackageForUpdate } from "../models/package.model";
import * as packageService from '../services/package.service';

const createPackage = async (req: Request, res: Response) => {
  try {
    let pack: PackageForCreate = req.body;
    let result = await packageService.create_package(pack);

    return res.status(201).json({ result });
  } catch (error: any) {
    console.error('Creating package error at controller: ', error);
    res.status(500).json({ 'error': error.message });
  }
}

const updatePackage = async (req: Request, res: Response) => {
  try {
    let pack: PackageForUpdate = req.body;
    let result = await packageService.update_package(pack);

    return res.status(201).json({ result });
  } catch (error: any) {
    console.error('Updating package error on controller: ', error);
    return res.status(500).json({ 'error': error.message })
  }
}

const readPackage = async (req: Request, res: Response) => {
  try {
    let { id } = req.body;
    let result = await packageService.read_package(id);

    return res.status(200).json({ result });
  } catch (error: any) {
    console.error('Reading package error on controller: ', error);
    return res.status(500).json({ 'error': error.messge });
  }
}

const deletePackage = async (req: Request, res: Response) => {
  try {
    let { id } = req.body;
    let result = await packageService.delete_package(id);

    return res.status(201).json({ result });
  } catch (error: any) {
    console.error('Deleting package error on controller: ', error);
    return res.status(500).json({ 'error': error.message });
  }
}


export { 
  createPackage,
  readPackage,
  updatePackage,
  deletePackage,
}
