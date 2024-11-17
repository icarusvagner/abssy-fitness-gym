import executeQuery from "../utils/executeQuery.util";

const get_dashboard = async () => {
  try {
    let query = "CALL get_dashboard()";
    let result: any = await executeQuery(query, []);

    return result[0][0];
  } catch (error: any) {
    console.error("Getting dashboard error on service: ", error);
    return error.message;
  }
};

const get_members_month = async () => {
  try {
    let query = "CALL get_members_per_month()";
    let result: any = await executeQuery(query, []);

    return result[0];
  } catch (error: any) {
    console.error("Getting members month error on service: ", error);
    return error.message;
  }
};

export { get_dashboard, get_members_month };
