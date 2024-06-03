import { Request, Response, NextFunction } from "express";
import { MemberForCreate, MemberForUpdate } from '../models/member.model';
import * as memberService from '../services/member.service';

const addMember = async (req: Request, res: Response) => {
  try {
    let member: MemberForCreate = req.body;
    let result = await memberService.add_member(member);

    return res.status(200).json({ result });
  } catch (error: any) {
    console.error('Adding member error on controller: ', error);
    return res.status(500).json({ 'error': error.message });
  }
}

const getMembers = async (req: Request, res: Response) => {
  try {
    let { id } = req.params;
    let result = await memberService.get_members(parseInt(id));

    return res.status(200).json({ result });
  } catch (error: any) {
    console.error('Getting members error on controller: ', error);
    return res.status(500).json({ 'error': error.message });
  }
}

const updateMember = async (req: Request, res: Response) => {
  try {
    let member: MemberForUpdate = req.body;
    let result = await memberService.update_member(member);

    return res.status(200).json({ result });
  } catch (error: any) {
    console.error('Updating member error on controller: ', error);
    return res.status(500).json({ 'error': error.message });
  }
}

const deleteMember = async (req: Request, res: Response) => {
  try {
    let { id } = req.body;
    let result = await memberService.delete_member(parseInt(id));

    return res.status(200).json({ result });
  } catch (error: any) {
    console.error('Deleting member error on controller: ', error);
    return res.status(500).json({ 'error': error.message });
  }
}

export {
  addMember,
  getMembers,
  updateMember,
  deleteMember,
}
