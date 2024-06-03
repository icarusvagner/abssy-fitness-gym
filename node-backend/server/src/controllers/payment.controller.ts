import { Request, Response, NextFunction } from "express";
import { PaymentForCreate, PaymentForUpdate } from '../models/payment.model';
import * as paymentService from '../services/payment.service';

const createPayment = async (req: Request, res: Response) => {
  try {
    let payment: PaymentForCreate = req.body;
    let result = await paymentService.create_payment(payment);

    return res.status(201).json({ result });
  } catch (error: any) {
    console.error('Creating payment error on controller: ', error);
    return res.status(500).json({ 'error': error.message });
  }
}

const updatePayment = async (req: Request, res: Response) => {
  try {
    let payment: PaymentForUpdate = req.body;
    let result = await paymentService.update_payment(payment);

    return res.status(200).json({ result });
  } catch (error: any) {
    console.error('Updating payment error on controller: ', error);
    return res.status(500).json({ 'error': error.message });
  }
}

const deletePayment = async (req: Request, res: Response) => {
  try {
    let { id } = req.body;
    let result = await paymentService.delete_payment(parseInt(id));

    return res.status(200).json({ result });
  } catch (error: any) {
    console.error('Deleting payment error on controller: ', error);
    return res.status(500).json({ 'error': error.message });
  }
}

const readPayment = async (req: Request, res: Response) => {
  try {
    let { id } = req.params;
    let result = await paymentService.read_payment(parseInt(id));

    return res.status(200).json({ result });
  } catch (error: any) {
    console.error('Reading payment error on controller: ', error);
    return res.status(500).json({ 'error': error.message });
  }
}

export {
  createPayment,
  updatePayment,
  deletePayment,
  readPayment,
}
