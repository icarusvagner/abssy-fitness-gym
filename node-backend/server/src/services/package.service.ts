import { Connect, Query } from "../utils/mysql.util";
import checkValidEnumValue from "../utils/checkEnum.util";
import executeQuery from "../utils/executeQuery.util";
import { PackageDate, PackageForCreate, PackageForUpdate } from "../models/package.model";

const create_package = async (pack: PackageForCreate) => {
  try {
    let query = "CALL create_package(?,?,?,?,?)";

    let result: any = await executeQuery(query, [
      pack.package_name,
      pack.duration,
      checkValidEnumValue(PackageDate, pack.package_date),
      pack.price,
      pack.benefits,
    ]);

    return {
      message: 'Package created successfully',
      status: 201,
    }

  } catch (error: any) {
    console.error('Creating package error on service: ', error);
    return error.message;
  }
}

const read_package = async (id: number) => {
  try {
    let query = "CALL read_package(?)";
    let result = await executeQuery(query, [id]);

    if (!result) {
      return {
        message: 'No package/s found or listed',
        status: 404
      };
    }

    return result;
  } catch (error: any) {
    console.error('Reading package error on service: ', error.message);
    return error.message;
  }
}

const update_package = async (pack: PackageForUpdate) => {
  try {
    let query = "CALL update_package(?,?,?,?,?,?)";
    let result: any = await executeQuery(query, [
			pack.id,
			pack.package_name,
			pack.duration,
      checkValidEnumValue(PackageDate, pack.package_date),
			pack.price,
			pack.benefits,
    ]);

    return {
      message: 'Package updated successfully',
      status: 201
    }

  } catch (error: any) {
    console.error('Updating package error on service: ', error.message);
    return error.message;
  }
}

const delete_package = async (id: number) => {
  try {
    let query = "CALL delete_package(?)";
    let result: any = await executeQuery(query, [id]);

    return {
      message: 'Package removed',
      status: 201,
    }

  } catch (error: any) {
    console.error('Deleting package error on service: ', error.message);
    return error.message;
  }
}

export {
  create_package,
  read_package,
  update_package,
  delete_package,
}
