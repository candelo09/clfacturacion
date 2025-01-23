export interface Customer {
  id:            number;
  name:          string;
  id_document:   string;
  email:         string;
  phone:         string;
  address:       string;
  date_birth:    Date;
  purchases:     number;
  last_purchase: Date;
  create_at:     Date;
  update_at:     Date;
}

export interface CustomerInfoAdi {
  id:                    number;
  id_document:           string;
  name:                  string;
  paid_date:             Date;
  amount:                number;
  payment_method:        string;
  payment_state:         number;
  id_membership:         number;
  id_customer:           number;
  membership_start_date: Date;
  membership_end_date:   Date;
  type_membership:       string;
  weight:                number;
  body_fat:              number;
  musculature:           number;
  stature:               number;
  remaining_days:        number;
}
