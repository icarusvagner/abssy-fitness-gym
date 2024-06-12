import executeQuery from "../utils/executeQuery.util";
import checkValidEnumValue from "../utils/checkEnum.util";
import { MemberForCreate, MemberForUpdate } from '../models/member.model';
import { Gender } from '../models/auth.model';

const add_member = async (member: MemberForCreate) => {
  try {
    let query = "CALL add_member(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
    let result: any = await executeQuery(query, [
			member.first_name.toLowerCase(),
			member.middle_name.toLowerCase(),
			member.last_name.toLowerCase(),
			member.phone_number.toLowerCase(),
			member.email_address.toLowerCase(),
			member.date_of_birth.toLowerCase(),
      checkValidEnumValue(Gender, member.gender),
			member.street.toLowerCase(),
			member.brgy.toLowerCase(),
			member.city.toLowerCase(),
			member.province.toLowerCase(),
			member.ec_first_name.toLowerCase(),
			member.ec_last_name.toLowerCase(),
			member.relationship.toLowerCase(),
			member.ec_phone_number.toLowerCase(),
			member.package_id,
			member.health_condition.toLowerCase(),
    ]);

    return {
      message: 'Member added successfully',
      status: 201,
    }
  } catch (error: any) {
    console.error('Adding member error on service: ', error);
    return error.message;
  }
}

const get_members = async (id: number) => {
  try {
    let query = "CALL get_member(?)";
    let result: any = await executeQuery(query, [id]);

    if (!result) {
      return {
        message: `Member with id: ${id} - not found`,
        status: 201,
      }
    }

    return result[0]
  } catch (error: any) {
    console.error('Getting member error on service: ', error);
    return error.message;
  }
}

const update_member = async (member: MemberForUpdate) => {
  try {
    let query = "CALL update_member(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
    let result: any = await executeQuery(query, [
      member.member_id,
			member.first_name.toLowerCase(),
			member.middle_name.toLowerCase(),
			member.last_name.toLowerCase(),
			member.phone_number.toLowerCase(),
			member.email_address.toLowerCase(),
			member.date_of_birth.toLowerCase(),
      checkValidEnumValue(Gender, member.gender),
			member.street.toLowerCase(),
			member.brgy.toLowerCase(),
			member.city.toLowerCase(),
			member.province.toLowerCase(),
			member.ec_first_name.toLowerCase(),
			member.ec_last_name.toLowerCase(),
			member.relationship.toLowerCase(),
			member.ec_phone_number.toLowerCase(),
			member.package_id,
			member.health_condition.toLowerCase(),
    ]);


    return {
      message: 'Member updated successfully',
      status: 200,
    }
  } catch (error: any) {
    console.error('Updating member error on service: ', error);
    return error.message;
  }
}

const delete_member = async (id: number) => {
  try {
    let query = "CALL delete_member(?)";
    let result: any = await executeQuery(query, [id]);

    return {
      message: 'Member removed',
      status: 200
    }
  } catch (error: any) {
    console.error('Deleting member error on service: ', error);
    return error.message;
  }
}

export {
  add_member,
  get_members,
  update_member,
  delete_member,
}
