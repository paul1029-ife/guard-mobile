export interface Guard {
  id: string;
  auth_user_id: string;
  name: string;
  guard_post: string;
}

export interface Complaint {
  id: string;
  guard_id: string;
  complaint_text: string;
  created_at: string;
  latitude: number;
  longitude: number;
}

export interface Location {
  latitude: number;
  longitude: number;
}
