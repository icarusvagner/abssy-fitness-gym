import executeQuery from "../utils/executeQuery.util";
import checkValidEnumValue from "../utils/checkEnum.util";
import { ScheduleForCreate, ScheduleForUpdate, ScheduleStatus } from '../models/schedule.model';

const create_schedule = async (sched: ScheduleForCreate) => {
  try {
    let query = "CALL add_schedule(?,?,?,?,?,?,?)"
    let result: any = await executeQuery(query, [
      sched.class_name,
      sched.trainer_id,
      sched.start_time,
      sched.end_time,
      sched.days_of_week,
      sched.location,
      checkValidEnumValue(ScheduleStatus, sched.status)
    ]);

    return {
      message: 'Schedule created successfully',
      status: 201,
    }
  } catch (error: any) {
    console.error('Creating schedule error on service: ', error);
    return error.message;
  }
}

const get_schedules = async (id: number) => {
  try {
    let query = "CALL get_schedule(?)";
    let result: any = await executeQuery(query, [id]);

    if (!result) {
      return {
        message: `Schedule with id: ${id} - not found`,
        status: 404
      }
    }

    return result[0];
  } catch (error: any) {
    console.error('Getting schedules error on service: ', error);
    return error.message;
  }
}

const update_schedule = async (sched: ScheduleForUpdate) => {
  try {
    let query = "CALL update_schedule(?,?,?,?,?,?,?,?)";
    let result: any = await executeQuery(query, [
      sched.id,
      sched.class_name,
      sched.trainer_id,
      sched.start_time,
      sched.end_time,
      sched.days_of_week,
      sched.location,
      checkValidEnumValue(ScheduleStatus, sched.status)
    ]);

    return {
      message: 'Schedule updated successfully',
      status: 200,
    }
  } catch (error: any) {
    console.error('Updating schedule error on service: ', error);
    return error.message;
  }
}

const delete_schedule = async (id: number) => {
  try {
    let query = "CALL delete_schedule(?)";
    let result: any = await executeQuery(query, [id]);

    return {
      message: 'Schedule removed',
      status: 200
    }
  } catch (error: any) {
    console.error('Deleting schedule error on service: ', error);
    return error.message;
  }
}

export {
  create_schedule,
  get_schedules,
  update_schedule,
  delete_schedule,
}
