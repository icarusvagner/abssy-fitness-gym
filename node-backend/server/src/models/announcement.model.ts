export enum AnnouncementType {
  Announcement = 'announcement',
  Event = 'event',
}

export interface AnnouncementForCreate {
  user_id: number;
  title: string;
  message: string;
  announcement_type: AnnouncementType;
}

export interface AnnouncementForUpdate {
  id: number;
  user_id: number;
  title: string;
  message: string;
}
