import executeQuery from "../utils/executeQuery.util";
import { AnnouncementForCreate, AnnouncementForUpdate } from '../models/announcement.model';

const create_announcement = async (announcement: AnnouncementForCreate) => {
  try {
    let query = "CALL create_announcement(?,?,?,?)";
    let result: any = await executeQuery(query, [
      announcement.user_id,
      announcement.title.toLowerCase(),
      announcement.message.toLowerCase(),
      announcement.announcement_type.toLowerCase(),
    ]);

    return {
      message: 'Announcement created',
      status: 201
    }
  } catch (error: any) {
    console.error('Creating announcement error on service: ', error);
    return error.message;
  }
}

const update_announcement = async (announcement: AnnouncementForUpdate) => {
  try {
    let query = "CALL update_announcement(?,?,?,?)";
    let result: any = await executeQuery(query, [
      announcement.id,
      announcement.user_id,
      announcement.title.toLowerCase(),
      announcement.message.toLowerCase(),
    ]);
    
    return {
      message: 'Announcement updated',
      status: 200
    }
  } catch (error: any) {
    console.error('Updating announcement error on service: ', error);
    return error.message;
  }
}

const get_announcement = async (id: number) => {
  try {
    let query = "CALL get_announcement(?)";
    let result: any = await executeQuery(query, [id]);
    
    return result[0];
  } catch (error: any) {
    console.error('Updating announcement error on service: ', error);
    return error.message;
  }
}

const delete_announcement = async (id: number) => {
  try {
    let query = "CALL delete_announcement(?)";
    let result: any = await executeQuery(query, [id]);

    return {
      message: 'Announcement removed',
      status: 200
    }
  } catch (error: any) {
    console.error('Updating announcement error on service: ', error);
    return error.message;
  }
}

export {
  create_announcement,
  get_announcement,
  delete_announcement,
  update_announcement,
}
