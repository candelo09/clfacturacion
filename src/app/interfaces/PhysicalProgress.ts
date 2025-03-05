import { Customer } from "./Customer";

export interface PhysicalProgress {
  id_user:                          null;
  weight:                           number;
  body_fat:                         number;
  musculature:                      number;
  id_customer:                      Customer;
  stature:                          number;
  calf_circumference:               number;
  average_arm_muscle_circumference: number;
  belt_circumference:               number;
  hip_circumference:                number;
  thigh_circumference:              number;
  relaxed_arm_circumference:        number;
  circumference_contracted_arm:     number;
}

// export interface IDCustomer {
//   id:            number;
//   name:          string;
//   document:      string;
//   email:         string;
//   phone:         string;
//   address:       string;
//   date_birth:    Date;
//   purchases:     null;
//   last_purchase: Date;
//   create_at:     Date;
//   update_at:     Date;
//   blood_type:    string;
//   eps:           string;
//   state:         number;
// }
