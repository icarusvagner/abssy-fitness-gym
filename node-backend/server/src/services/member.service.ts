import executeQuery from "../utils/executeQuery.util";
import bcryptjs from "bcryptjs";
import checkValidEnumValue from "../utils/checkEnum.util";
import {
  MemberForCreate,
  MemberForUpdate,
  MemberRenewPackage,
  MemberUpgradePackage,
} from "../models/member.model";
import { Gender } from "../models/auth.model";
import { read_package } from "./package.service";
import EmailTemplate from "../utils/emailTemplate.util";
import signedJWT from "../utils/signedJWT.util";

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
      member.ec_relationship.toLowerCase(),
      member.ec_phone_number.toLowerCase(),
      member.package_id,
      member.health_condition.toLowerCase(),
    ]);

    let varEncode =
      btoa(member.email_address) +
      "." +
      btoa("abbsy") +
      "." +
      btoa(String(Date.now()));
    let pack = await read_package(member.package_id);
    let encodePack =
      btoa(pack[0].package_name) +
      "." +
      btoa(pack[0].price) +
      "." +
      btoa(pack[0].id);
    let message = `http://${process.env.WEB_URL}:${process.env.WEB_PORT}/verification?user=${varEncode}&package=${encodePack}`;

    let emailTem = new EmailTemplate(member.email_address, message);
    let res_sent = await emailTem.sendEmailWithNodeMailer();

    return {
      message: res_sent,
      status: 201,
    };
  } catch (error: any) {
    console.error("Adding member error on service: ", error);
    return error.message;
  }
};

const get_members = async (id: number) => {
  try {
    let query = "CALL get_member(?)";
    let result: any = await executeQuery(query, [id]);

    if (!result) {
      return {
        message: `Member with id: ${id} - not found`,
        status: 201,
      };
    }

    return result[0];
  } catch (error: any) {
    console.error("Getting member error on service: ", error);
    return error.message;
  }
};

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
      message: "Member updated successfully",
      status: 200,
    };
  } catch (error: any) {
    console.error("Updating member error on service: ", error);
    return error.message;
  }
};

const delete_member = async (id: number) => {
  try {
    let query = "CALL delete_member(?)";
    let result: any = await executeQuery(query, [id]);

    return {
      message: "Member removed",
      status: 200,
    };
  } catch (error: any) {
    console.error("Deleting member error on service: ", error);
    return error.message;
  }
};

const get_purchased_package = async (id: number) => {
  try {
    let query = "CALL get_purchased_package(?)";
    let result: any = await executeQuery(query, [id]);

    return result[0];
  } catch (error: any) {
    console.error("Getting purchased package error on service: ", error);
    return error.message;
  }
};

const verify_change_pass = async (
  email: string,
  username: string,
  password: string,
  reference_no: string,
  purchased_id: number,
  package_id: number,
) => {
  try {
    let query = "CALL update_member_status(?,?,?,?,?,?)";
    let hash = await bcryptjs.hash(password, 10);
    let result: any = await executeQuery(query, [
      email,
      username,
      hash,
      reference_no,
      purchased_id,
      package_id,
    ]);

    return result[0][0];
  } catch (error: any) {
    console.error("Verify and change pass error on service: ", error);
    return error.message;
  }
};

const checkIfVerified = async (email: string) => {
  try {
    let query = "CALL check_verified_email(?)";
    let result: any = await executeQuery(query, [email]);

    return result[0][0];
  } catch (error: any) {
    console.error(
      "Checking email address if verified error on service: ",
      error.message,
    );
    return error.message;
  }
};

const login_member = async (
  username: string,
  password: string,
): Promise<string | any> => {
  try {
    let query = "CALL login_member(?)";
    let member: any = await executeQuery(query, [username]);

    if (member[0][0].status == 404) {
      return member[0][0];
    }

    let mem_iden = {
      username: member[0][0].username,
      password: member[0][0].password,
      user_id: member[0][0].id,
      role: "member",
    };

    const result = await new Promise((resolve, reject) => {
      bcryptjs.compare(password, mem_iden.password, (error, result) => {
        if (error) {
          console.error(error);
          // Reject the Promise with an error object
          reject({
            message: error.message,
            error,
            status: 500,
          });
        } else if (result) {
          signedJWT(
            { ...member[0], user_id: member[0][0].id, role: "member" },
            (_error, accessToken, refreshToken) => {
              if (_error) {
                // Reject the Promise with an error object
                reject({
                  message: "Unable to SIGN Token",
                  error: _error,
                  status: 401,
                });
              } else if (accessToken && refreshToken) {
                // Resolve the Promise with the desired value
                resolve({
                  accessToken,
                  refreshToken,
                  status: 200,
                });
              }
            },
          );
        } else {
          // Reject the Promise with an error object
          reject({
            message: "Login failed wrong password",
            status: 500,
          });
        }
      });
    });

    return result; // Resolve the Promise with the result
  } catch (error: any) {
    console.error("Logging in member error on service: ", error.message);
    return error.message;
  }
};

const get_member_details = async (username: string) => {
  try {
    let query = "CALL after_login(?)";
    let result: any = await executeQuery(query, [username]);

    return result[0];
  } catch (error: any) {
    console.error("Getting member details error on service: ", error.message);
    return error.message;
  }
};

const get_one_member_details = async (user: string) => {
  try {
    let query = "CALL get_one_member_details(?)";
    let result: any = await executeQuery(query, [user]);
    return result[0][0];
    return;
  } catch (error: any) {
    console.error("Getting one member error on service: ", error.message);
    return error.message;
  }
};

const upgrade_member_package = async (member_update: MemberUpgradePackage) => {
  try {
    let query = "CALL upgrade_member_package(?,?,?,?)";
    let result: any = await executeQuery(query, [
      member_update.pack_id,
      member_update.member_id,
      member_update.ref_number,
      member_update.purchased_id,
    ]);

    return result[0];
  } catch (error: any) {
    console.error("Upgrade member package service error: ", error.message);
    return error.message;
  }
};

const renew_member_package = async (renew_pack: MemberRenewPackage) => {
  try {
    let query = "CALL renew_member_package(?,?)";
    let result: any = await executeQuery(query, [
      renew_pack.pack_id,
      renew_pack.member_id,
    ]);

    return result[0][0];
  } catch (error: any) {
    console.error("Renewing member package service error: ", error.message);
    return error.message;
  }
};

export {
  get_one_member_details,
  get_member_details,
  login_member,
  checkIfVerified,
  verify_change_pass,
  add_member,
  get_members,
  update_member,
  delete_member,
  get_purchased_package,
  upgrade_member_package,
  renew_member_package,
};
