import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../interfaces/Producto';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private routeProduct = 'http://localhost:8081/products/';

  constructor(private http: HttpClient) { }


  public getProducts():Observable<Product[]>{

    return this.http.get<Product[]>(`${this.routeProduct}all`);

  }

  public createProduct(product:Product):Observable<Product>{

    return this.http.post<Product>(`${this.routeProduct}save`, product);

  }

  public editProduct(product:Product):Observable<Product>{

    return this.http.put<Product>(`${this.routeProduct}edit/${product.id}`, product);

  }

  public deleteProduct(product:Product):Observable<Product>{
    return this.http.delete<Product>(`${this.routeProduct}delete/${product.id}`)
  }


}
