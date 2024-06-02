export interface ScheduleForCreate {
	class_name: string;
	trainer_id: number;
	start_time: string;
	end_time: string;
	days_of_week: string;
	location: string;
	status: ScheduleStatus;
}

export enum ScheduleStatus {
  Available = 'available',
  Unavailable = 'unavailable'
}
