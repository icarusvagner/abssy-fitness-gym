import executeQuery from "../utils/executeQuery.util";
import checkValidEnumValue from "../utils/checkEnum.util";
import { TrainerForCreate, TrainerForUpdate } from '../models/trainer.model';
import { Gender } from '../models/auth.model';

const create_trainer = async (trainer: TrainerForCreate) => {
  try {
    let query = "CALL create_trainer(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
    let result: any = await executeQuery(query, [
			trainer.first_name.toLowerCase(),
			trainer.middle_name.toLowerCase(),
			trainer.last_name.toLowerCase(),
			trainer.phone_number.toLowerCase(),
			trainer.email_address.toLowerCase(),
			trainer.date_of_birth.toLowerCase(),
      checkValidEnumValue(Gender, trainer.gender),
			trainer.street.toLowerCase(),
			trainer.brgy.toLowerCase(),
			trainer.city.toLowerCase(),
			trainer.province.toLowerCase(),
			trainer.ec_first_name.toLowerCase(),
			trainer.ec_last_name.toLowerCase(),
			trainer.ec_relationship.toLowerCase(),
			trainer.ec_phone_number.toLowerCase(),
			trainer.specialization.toLowerCase(),
			trainer.certifications.toLowerCase(),
			trainer.experience_years,
			trainer.hire_date,
			trainer.availability.toLowerCase(),
    ]);

    return {
      message: 'Trainer created successfully',
      status: 201,
    }
  } catch (error: any) {
    console.error('Adding trainer error on service: ', error);
    return error.message;
  }
}

const read_trainer = async (id: number) => {
  try {
    let query = "CALL read_trainer(?)";
    let result: any = await executeQuery(query, [id]);

    if (!result) {
      return {
        message: `Trainer with id: ${id} - not found`,
        status: 404
      }
    }

    return result[0];
  } catch (error: any) {
    console.error('Reading trainer error on service: ', error);
    return error.message;
  }
}

const update_trainer = async (trainer: TrainerForUpdate) => {
  try {
    let query = "CALL update_trainer(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
    let result: any = await executeQuery(query, [
			trainer.trainer_id,
			trainer.first_name.toLowerCase(),
			trainer.middle_name.toLowerCase(),
			trainer.last_name.toLowerCase(),
			trainer.phone_number.toLowerCase(),
			trainer.email_address.toLowerCase(),
			trainer.date_of_birth,
      checkValidEnumValue(Gender, trainer.gender),
			trainer.street.toLowerCase(),
			trainer.brgy.toLowerCase(),
			trainer.city.toLowerCase(),
			trainer.province.toLowerCase(),
			trainer.ec_first_name.toLowerCase(),
			trainer.ec_last_name.toLowerCase(),
			trainer.ec_relationship.toLowerCase(),
			trainer.ec_phone_number.toLowerCase(),
			trainer.specialization.toLowerCase(),
			trainer.certifications.toLowerCase(),
			trainer.experience_years,
			trainer.hire_date,
			trainer.availability.toLowerCase(),
			trainer.trainer_status.toLowerCase(),
    ]);
    
    return {
      message: 'Trainer updated successfully',
      status: 201,
    }
  } catch (error: any) {
    console.error('Updating trainer error on service: ', error);
    return error.message;
  }
}

const delete_trainer = async (id: number) => {
  try {
    let query = "CALL delete_trainer(?)";
    let result: any = await executeQuery(query, [id]);

    return {
      message: 'Trainer removed',
      status: 200
    }
  } catch (error: any) {
    console.error('Deleting trainer error on service: ', error);
    return error.message;
  }
}

export {
  create_trainer,
  read_trainer,
  update_trainer,
  delete_trainer,
}
