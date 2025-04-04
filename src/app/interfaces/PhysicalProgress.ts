import { Customer } from "./Customer";

export interface PhysicalProgress {
  id:            number;
  id_user:       null;
  weight:        number;
  body_fat:      number;
  musculature:   number;
  id_customer:   Customer;
  stature:       number;
  neck:          number;
  shoulders:     number;
  chest:         number;
  abdomen:       number;
  waist:         number;
  hips:          number;
  biceps:        number;
  forearm:       number;
  thigh:         number;
  calf:          number;
  progress_date: Date;
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
