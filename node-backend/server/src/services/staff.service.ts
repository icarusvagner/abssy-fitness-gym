import executeQuery from "../utils/executeQuery.util";
import { StaffForUpdate, StaffRole } from '../models/staff.model';
import checkValidEnumValue from "../utils/checkEnum.util";
import { Gender } from '../models/auth.model';

const update_staff = async (staff: StaffForUpdate) => {
  try {
    console.log('Staff for update: ',staff);
    let query = "CALL update_staff(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
    let result: any = await executeQuery(query, [
			staff.staff_id,
			staff.first_name,
			staff.middle_name,
			staff.last_name,
			staff.phone_number,
			staff.email_address,
			staff.date_of_birth,
      checkValidEnumValue(Gender, staff.gender),
			staff.address_street,
			staff.address_brgy,
			staff.address_city,
			staff.address_province,
			staff.ec_first_name,
			staff.ec_last_name,
			staff.ec_relationship,
			staff.ec_phone_number,
      checkValidEnumValue(StaffRole, staff.role),
			staff.shift_schedule,
    ]);

    console.log('Result update: ', result);
    return {
      message: 'Staff updated',
      status: 201
    }
  } catch (error: any) {
    console.error('Updating staff error on service: ', error);
    return error.message;
  }
}

const read_staff = async (id: number) => {
  try {
    let query = "CALL read_staff(?)";
    let result: any = await executeQuery(query, [id]);

    if (!result) {
      return {
        message: `Staff with id: ${id} - not found`,
        status: 404
      }
    }

    return result[0];
  } catch (error: any) {
    console.error('Reading staff error on service: ', error);
    return error.message;
  }
}

const delete_staff = async (id: number) => {
  try {
    let query = "CALL delete_staff(?)";
    let result: any = await executeQuery(query, [id]);

    return {
      message: 'Staff removed',
      status: 200
    }
  } catch (error: any) {
    console.error('Deleting staff error on service: ', error);
    return error.message;
  }
}

export {
  update_staff,
  read_staff,
  delete_staff,
}
