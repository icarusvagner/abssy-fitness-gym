import executeQuery from "../utils/executeQuery.util";
import checkValidEnumValue from "../utils/checkEnum.util";
import { TrainerForCreate, TrainerForUpdate } from '../models/trainer.model';
import { Gender } from '../models/auth.model';

const create_trainer = async (trainer: TrainerForCreate) => {
  try {
    let query = "CALL create_trainer(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
    let result: any = await executeQuery(query, [
			trainer.first_name,
			trainer.middle_name,
			trainer.last_name,
			trainer.phone_number,
			trainer.email_address,
			trainer.date_of_birth,
      checkValidEnumValue(Gender, trainer.gender),
			trainer.street,
			trainer.brgy,
			trainer.city,
			trainer.province,
			trainer.ec_first_name,
			trainer.ec_last_name,
			trainer.ec_relationship,
			trainer.ec_phone_number,
			trainer.specialization,
			trainer.certifications,
			trainer.experience_years,
			trainer.hire_date,
			trainer.availability,
    ]);

    console.log(result);

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
			trainer.first_name,
			trainer.middle_name,
			trainer.last_name,
			trainer.phone_number,
			trainer.email_address,
			trainer.date_of_birth,
      checkValidEnumValue(Gender, trainer.gender),
			trainer.street,
			trainer.brgy,
			trainer.city,
			trainer.province,
			trainer.ec_first_name,
			trainer.ec_last_name,
			trainer.ec_relationship,
			trainer.ec_phone_number,
			trainer.specialization,
			trainer.certifications,
			trainer.experience_years,
			trainer.hire_date,
			trainer.availability,
			trainer.trainer_status,
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
