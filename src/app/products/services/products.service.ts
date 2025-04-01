import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ProductsResponse } from '@products/interfaces/product.interface';
import { Options } from '@products/store-front/interfaces/option.interface';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

//Constante con la variable de entorno: 'http://localhost:3000/api'
const baseUrl = environment.baseUrl;

@Injectable({providedIn: 'root'})
export class ProductsService {
  private http = inject(HttpClient);

  getProducts(options:Options): Observable<ProductsResponse>{
    //El límite por defecto va a ser 9, el offset 0 y el género vacío
    //Son los valores que podemos meter por parámetro a la api:
    // 'localhost:3000/api/products?limit=9&offset=0&gender=' ''
    const{ limit = 9, offset = 0, gender = ' '} = options;
    return this.http.get<ProductsResponse>(`${baseUrl}/products`, {
      params: {
        limit,
        offset,
        gender,
      },
    })
    .pipe(
      tap( resp => console.log(resp))
    );
  }

}
