export interface AnnouncementForSelect {
  announcement_id
  login_id: number;
  admin_id: number;
  fullname: string;
  title: string;
  message: string;
  created_at: string;
  stats: string;
}

export interface AnnouncementForSelectWrapper {
  announcements: [] as AnnouncementForSelect;
}

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
