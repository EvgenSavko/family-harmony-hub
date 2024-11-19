export interface UserState {
  first_name: string;
  blood_type: string;
  last_name: string;
  birthday: string;
  phone: string;
  emergency_phone: string;
  address: string;
  health_conditions: string;
  medications: string;
  allergies: string;
  doctors_phone: string;
  goals_dreams: string;
  lifestyle_hobbies: string;
}

export interface UserStateApi extends UserState {
  family_id: string;
  user_email: string;
}
