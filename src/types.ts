export interface University {
  id: number;
  name: string;
  location: string;
  state: string;
  type: string;
  ranking: number;
  description: string;
  website: string;
  image_url: string;
  courses?: Course[];
}

export interface Course {
  id: number;
  university_id: number;
  university_name?: string;
  university_location?: string;
  name: string;
  type: string;
  duration: string;
  fees: number;
  entrance_exam: string;
  description: string;
}

export interface Student {
  id: number;
  name: string;
  email: string;
  phone?: string;
  education_history?: string;
  entrance_scores?: string;
  dob?: string;
  gender?: string;
  nationality?: string;
  address?: string;
  tenth_marks?: string;
  twelfth_marks?: string;
  jee_percentile?: string;
  cuet_score?: string;
  documents?: { name: string; size: string; type: string; url: string }[];
  settings?: {
    email_notifications: boolean;
    sms_alerts: boolean;
    profile_visibility: boolean;
  };
}

export interface Application {
  id: number;
  student_id: number;
  university_id: number;
  course_id: number;
  status: 'Draft' | 'Submitted' | 'Under Review' | 'Accepted' | 'Rejected';
  submitted_at: string;
  university_name?: string;
  course_name?: string;
}
