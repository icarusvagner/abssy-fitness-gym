import { Request, Response, NextFunction } from "express";
import { InventoryForInsert, InventoryForUpdate, InventoryForSelect } from '../models/inventory.model';
import * as inventoryService from '../services/inventory.service';

const insertInventory = async (req: Request, res: Response) => {
  try {
    let data: InventoryForInsert = req.body;
    let result = await inventoryService.insert_inventory(data);

    return res.status(201).json({ result });
  } catch (error: any) {
    console.error('Inserting inventory error on controller: ', error);
    return res.status(500).json({ 'error': error.mesage });
  }
}

const updateInventory = async (req: Request, res: Response) => {
  try {
    let data: InventoryForUpdate = req.body;
    let result = await inventoryService.update_inventory(data);

    return res.status(200).json({ result });
  } catch (error: any) {
    console.error('Updating inventory error on controller: ', error);
    return res.status(500).json({ 'error': error.message });
  }
}

const selectInventory = async (req: Request, res: Response) => {
  try {
    let data: InventoryForSelect = req.body;
    let result = await inventoryService.select_inventory(data);

    return res.status(200).json({ result });
  } catch (error: any) {
    console.error('Selecting inventory error on controller: ', error);
    return res.status(500).json({ 'error': error.message });
  }
}

const selectInventoryLog = async (req: Request, res: Response) => {
  try {
    let result = await inventoryService.select_inventory_log();

    return res.status(200).json({ result });
  } catch (error: any) {
    console.error('Selecting inventory log error on controller: ', error);
    return res.status(500).json({ 'error': error.message });
  }
}

export {
  insertInventory,
  updateInventory,
  selectInventory,
  selectInventoryLog,
}
