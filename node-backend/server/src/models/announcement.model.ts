export interface AnnouncementForCreate {
  user_id: number;
  title: string;
  message: string;
}

export interface AnnouncementForUpdate {
  id: number;
  user_id: number;
  title: string;
  message: string;
}
