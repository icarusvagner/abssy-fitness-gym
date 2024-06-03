import executeQuery from "../utils/executeQuery.util";
import checkValidEnumValue from "../utils/checkEnum.util";
import { PaymentForCreate, PaymentMethod, PaymentStatus, PaymentForUpdate } from '../models/payment.model';

const create_payment = async (payment: PaymentForCreate) => {
  try {
    let query = "CALL create_payment(?,?,?,?,?)";
    let result: any = await executeQuery(query, [
			payment.member_id,
			payment.amount,
			payment.payment_date,
      checkValidEnumValue(PaymentMethod, payment.payment_method),
			payment.package_id,
    ]);

    return {
      message: 'Payment added',
      status: 201,
    }
  } catch (error: any) {
    console.error('Creating payment error on service: ', error);
    return error.message;
  }
}

const update_payment = async (payment: PaymentForUpdate) => {
  try {
    let query  = "CALL update_payment(?,?,?,?,?)";
    let result: any = await executeQuery(query, [
			payment.payment_id,
			payment.amount,
			payment.payment_date,
      checkValidEnumValue(PaymentStatus, payment.payment_status),
			payment.package_id,
    ]);

    return {
      message: 'Payment updated',
      status: 200
    }
  } catch (error: any) {
    console.error('Updating payment error on service: ', error);
    return error.message;
  }
}

const delete_payment = async (id: number) => {
  try {
    let query = "CALL delete_payment(?)";
    let result: any = await executeQuery(query, [id]);

    return {
      message: 'Payment removed',
      status: 200
    }
  } catch (error: any) {
    console.error('Deleting payment error on service: ', error);
    return error.message;
  }
}

const read_payment = async (id: number) => {
  try {
    let query = "CALL read_payment_member(?)";
    let result: any = await executeQuery(query, [id]);

    if (!result) {
      return {
        message: `Schedule with id: ${id} - not found`,
        status: 404
      }
    }

    return result[0];
  } catch (error: any) {
    console.error('Reading payment error on service: ', error);
    return error.message;
  }
}

export {
  create_payment,
  update_payment,
  delete_payment,
  read_payment,
}
