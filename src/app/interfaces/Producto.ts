import { Category } from "./Category";

export interface Product {
  id:             number;
  category:       Category;
  code_prod:      number;
  description:    string;
  laboratory:     string;
  expire_date:    Date;
  image:          null;
  stock:          number;
  purchase_price: number;
  sales_price:    number;
  invoices:       number;
  create_at:      Date;
}

export interface FormProducto {
  codigo: string;
  nombreProducto: string;
  valorCompra: number;
  valorVenta: number;
  fecha_vencimiento: Date;
  cantidadStock: number;
  idCategorias: number;
}

