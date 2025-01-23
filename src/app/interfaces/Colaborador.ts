export interface Users {
  id:                    number;
  name:                  string;
  username:              string;
  password:              string;
  image:                 string;
  last_login:            Date;
  create_at:             Date;
  role:                  string;
  id_membership:         number;
  id_document:           string;
  email:                 null;
  telephone:             null;
  address:               null;
  state:                 number;
  enabled:               boolean;
  authorities:           Authority[];
  credentialsNonExpired: boolean;
  accountNonExpired:     boolean;
  accountNonLocked:      boolean;
}

export interface Authority {
  authority: string;
}

export interface NewColaborador{
    idUsuario:      number;
    identificacion: number;
    nombreuser:     string;
    claveUser:      string;
    nombre:         string;
    imagen:         string;
    apellido:       string;
    correo:         string;
    telefono:       string;
    direccion:      string;
    cargo:          string;
    estado:         string;
}
