import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Product, ProductsResponse } from '@products/interfaces/product.interface';
import { Options } from '@products/store-front/interfaces/option.interface';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

//Constante con la variable de entorno: 'http://localhost:3000/api'
const baseUrl = environment.baseUrl;

@Injectable({providedIn: 'root'})
export class ProductsService {
  private http = inject(HttpClient);

  getProducts(options: Options): Observable<ProductsResponse> {
    const { limit = 20, offset = 0, gender ='' } = options;

    return this.http
      .get<ProductsResponse>(`${baseUrl}/products`, {
        params: {
          limit,
          offset,
          gender,
        },
      })/*
      .pipe(tap((resp) => console.log(resp))) */;
  }

  getProductByIdSlug(idSlug: string): Observable<Product>{
    return this.http.get<Product>(`${baseUrl}/products/${idSlug}`);
  }

}
