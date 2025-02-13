export interface Payment {
  id:                    number;
  paid_date:             Date;
  amount:                number;
  payment_method:        string;
  payment_state:         number;
  membership:            Membership;
  customer:              Customer;
  membership_start_date: Date;
  membership_end_date:   Date;
}

export interface Customer {
  id:            number;
  name:          string;
  document:      string;
  email:         string;
  phone:         string;
  address:       string;
  date_birth:    Date;
  purchases:     null;
  last_purchase: Date;
  create_at:     Date;
  update_at:     Date;
  blood_type:    string;
  eps:           string;
}

export interface Membership {
  id:              number;
  type_membership: string;
  price:           number;
  state:           number;
  code_plan:       number;
}
