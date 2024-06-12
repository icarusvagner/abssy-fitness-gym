import executeQuery from "../utils/executeQuery.util";
import checkValidEnumValue from "../utils/checkEnum.util";
import { InventoryForInsert, InventoryClassification, InventoryForUpdate, InventoryType, InventoryForSelect } from '../models/inventory.model';

const insert_inventory = async (data: InventoryForInsert) => {
  try {
    let query = "CALL insert_inventory(?,?,?,?)";
    let result: any = await executeQuery(query, [
      data.brand_name.toLowerCase(),
      data.classification.toLowerCase(),
      data.base_count,
      checkValidEnumValue(InventoryType, data.p_type),
    ]);

    console.log(data);

    return {
      message: 'Inserted into inventory',
      status: 201
    }
  } catch (error: any) {
    console.error('Inserting inventory error on service: ', error);
    return error.message;
  }
}

const update_inventory = async (data: InventoryForUpdate) => {
  try {
    let query = "CALL update_inventory(?,?,?,?)";
    let result: any = await executeQuery(query, [
      data.inventory_id,
      data.quantity,
      checkValidEnumValue(InventoryClassification, data.p_type),
      checkValidEnumValue(InventoryType, data.classification),
    ]);

    console.log(result);

    return {
      message: 'Updating inventory',
      status: 200
    }
  } catch (error: any) {
    console.error('Updating inventory error on service: ', error);
    return error.message;
  }
}

const select_inventory = async (data: InventoryForSelect) => {
  try {
    let query = "CALL select_inventory(?,?)";
    let result: any = await executeQuery(query, [
      data.id,
      checkValidEnumValue(InventoryType, data.p_type)
    ]);

    return result[0];
  } catch (error: any) {
    console.error('Selecting inventory error on service: ', error);
    return error.message;
  }
}

const select_inventory_log = async () => {
  try {
    let query = "SELECT * FROM inventory_log_view";
    let result: any = await executeQuery(query, []);

    return result;
  } catch (error: any) {
    console.error('Selecting inventory log error on service: ', error);
    return error.message;
  }
}

export {
  insert_inventory,
  update_inventory,
  select_inventory,
  select_inventory_log,
}
