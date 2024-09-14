export enum AnnouncementType {
  Announcement = 'announcement',
  Event = 'event',
}

export interface AnnouncementForSelect {
  announcement_id: number;
  login_id: number;
  admin_id: number;
  fullname: string;
  title: string;
  message: string;
  created_at: string;
  stats: string;
  announcement_type: AnnouncementType;
}

export interface AnnouncementForSelectWrapper {
  announcements: [] as AnnouncementForSelect;
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
