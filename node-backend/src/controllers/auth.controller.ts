import { Request, Response, NextFunction } from "express";
import { StaffForCreate, AdminForCreate, UserForLogin } from '../models/auth.model';
import * as authService from '../services/auth.service';

const registerStaff = async (req: Request, res: Response) => {
  try {
    let staff: StaffForCreate = req.body;
    let result = await authService.register_staff(staff);
    res.status(200).json({ result });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ 'error': error.message })
  }
}

const registerAdmin = async (req: Request, res: Response) => {
  try {
    let admin: AdminForCreate = req.body;
    let result = await authService.register_admin(admin);
    res.status(201).json({ result });
  } catch (error: any) {
    console.error('Register admin error on controller: ', error);
    res.status(500).json({ 'error': error.message })
  }
}

const loginUser = async (req: Request, res: Response) => {
  try {
    console.log(req.body);
    let user: UserForLogin = req.body;
    let result = await authService.login_user(user);
    res.status(201).json({ result });
  } catch (error: any) {
    console.error('Logging in user error on controller: ',error);
    res.status(500).json({ 'error': error.message });
  }
}

const logoutUser = async (req: Request, res: Response) => {
  try {
    let { refresh_token } = req.body;
    let result = await authService.logout_user(refresh_token);
    res.status(200).json({ result });
  } catch (error: any) {
    console.error('Logging out error on controller: ', error);
    res.status(500).json({ 'error': error.message });
  }
}

export { registerStaff, loginUser, logoutUser, registerAdmin };
