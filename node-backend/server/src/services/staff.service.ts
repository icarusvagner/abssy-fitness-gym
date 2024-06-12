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
			staff.first_name.toLowerCase(),
			staff.middle_name.toLowerCase(),
			staff.last_name.toLowerCase(),
			staff.phone_number.toLowerCase(),
			staff.email_address.toLowerCase(),
			staff.date_of_birth.toLowerCase(),
      checkValidEnumValue(Gender, staff.gender),
			staff.address_street.toLowerCase(),
			staff.address_brgy.toLowerCase(),
			staff.address_city.toLowerCase(),
			staff.address_province.toLowerCase(),
			staff.ec_first_name.toLowerCase(),
			staff.ec_last_name.toLowerCase(),
			staff.ec_relationship.toLowerCase(),
			staff.ec_phone_number.toLowerCase(),
      checkValidEnumValue(StaffRole, staff.role),
			staff.shift_schedule.toLowerCase(),
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
