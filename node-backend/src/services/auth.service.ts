import bcryptjs from "bcryptjs";
import signedJWT from "../utils/signedJWT.util";
import { UserForLogin, StaffForCreate, AdminForCreate, Gender, Role, AdminRole, RoleUpdate, PasswordForUpdate } from "../models/auth.model";
import { Connect, Query } from "../utils/mysql.util";
import { IMySQLResult, IUser } from "../models/result.model";
import checkValidEnumValue from "../utils/checkEnum.util";
import executeQuery from "../utils/executeQuery.util";

const register_admin = async (
  admin: AdminForCreate
): Promise<AdminForCreate | any> => {
  try {
    const hash = await bcryptjs.hash(admin.password, 10);

    // Insert data to the database
    let query = "CALL register_admin(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);";

    const connection = await Connect();
    const result: any = await Query<IMySQLResult>(connection, query, [
      admin.first_name,
      admin.middle_name,
      admin.last_name,
      admin.phone_number,
      admin.email_address,
      admin.date_of_birth,
      checkValidEnumValue(Gender, admin.gender),
      admin.street,
      admin.brgy,
      admin.city,
      admin.province,
      admin.username,
      hash,
      checkValidEnumValue(AdminRole, admin.role),
      admin.permission_level
    ]);

    return result[0][0];
  } catch (error: any) {
    console.error(`Registration Error: ${error.message}`);
    return {
      message: error.message,
      error,
      status: 500,
    };
  }
};

const register_staff = async (
  staff: StaffForCreate
): Promise<StaffForCreate | any> => {
  try {
    const hash = await bcryptjs.hash(staff.password, 10);

    // Insert data to the database
    let query = "CALL register_staff(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);";

    const connection = await Connect();
    const result: any = await Query<IMySQLResult>(connection, query, [
      staff.first_name,
      staff.middle_name,
      staff.last_name,
      staff.phone_number,
      staff.email_address,
      staff.date_of_birth,
      checkValidEnumValue(Gender, staff.gender),
      staff.street,
      staff.brgy,
      staff.city,
      staff.provine,
      staff.ec_first_name,
      staff.ec_last_name,
      staff.relationship,
      staff.ec_phone_number,
      staff.username,
      hash,
      checkValidEnumValue(Role, staff.role),
      staff.shift_schedule,
    ]);

    return result[0][0];
  } catch (error: any) {
    console.error(`Registration Error: ${error.message}`);
    return {
      message: error.message,
      error,
      status: 500,
    };
  }
};

const login_user = async (user: UserForLogin): Promise<string | any> => {
  let query = "CALL login_user(?)";

  try {
    const connection = await Connect();
    const users = await Query<IUser[]>(connection, query, [user.username]);
    connection.end();

    const result = await new Promise((resolve, reject) => {
      bcryptjs.compare(user.password, users[0][0].password, (error, result) => {
        if (error) {
          console.error(error);
          // Reject the Promise with an error object
          reject({
            message: error.message,
            error,
            status: 500,
          });
        } else if (result) {
          signedJWT(users[0], (_error, accessToken, refreshToken) => {
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
                id: users[0][0].user_id,
                role: users[0][0].role,
                accessToken,
                refreshToken,
              });
            }
          });
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
    console.error("Connection Error");
    // Reject the Promise with an error object
    throw {
      message: error.message,
      error,
      status: 500,
    };
  }
};

const logout_user = async (refresh_token: string) => {
  try {
    const query = "DELETE FROM refresh_token WHERE refresh_token = ?";

    console.log("refresh_token: ", refresh_token);
    const result: any = await executeQuery(query, [refresh_token]);

    console.log("Logout result: ", result);

    if (result.affectedRows === 1) {
      return { message: "Logout Successfully" };
    } else {
      return result;
    }
  } catch (error: any) {
    console.error("Logging out User Error:", error);
    return {
      message: error.message,
      error,
      status: 500,
    };
  }
};

const change_user_password = async (user: PasswordForUpdate) => {
  try {
    const query = "CALL change_password(?,?,?)";
    const hash = await bcryptjs.hash(user.new_password, 10);
    const result: any = await executeQuery(query, [user.id, checkValidEnumValue(RoleUpdate, user.role), hash]);

    return result[0][0];
  } catch (error: any) {
    console.error('Changing password on service error: ', error);
    return {
      message: error.message,
      error,
      status: 500,
    };
  }
};

export {
  register_staff,
  register_admin,
  login_user,
  logout_user,
  change_user_password,
};
