import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Product, ProductsResponse } from '@products/interfaces/product.interface';
import { Options } from '@products/store-front/interfaces/option.interface';
import { Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

//Constante con la variable de entorno: 'http://localhost:3000/api'
const baseUrl = environment.baseUrl;

@Injectable({providedIn: 'root'})
export class ProductsService {
  private http = inject(HttpClient);
  private productsCache = new Map<string, ProductsResponse>();
  private productCache = new Map<string, Product>();

  getProducts(options: Options): Observable<ProductsResponse> {
    const { limit = 12, offset = 0, gender ='' } = options;

    //PARA GUARDAR EN CACHÉ NECESITAMOS GUARDAR LAS LLAVES PARAM
    const key = `${limit}-${offset}-${gender}`;
    //Si esta key está en el productsCache
    if(this.productsCache.has(key)){
      //Retornamos un observable
      return of(this.productsCache.get(key)!);
    }

    return this.http
      .get<ProductsResponse>(`${baseUrl}/products`, {
        params: {
          limit,
          offset,
          gender,
        },
      })
      .pipe(
        tap((resp) => console.log(resp)),
        tap((resp) => this.productsCache.set(key, resp)),
      );
  }

  getProductByIdSlug(idSlug: string): Observable<Product>{
    //Vemos si el idSlug del producto está en la caché del producto
    if(this.productCache.has(idSlug)){
      //Retornamos un observable
      return of(this.productCache.get(idSlug)!);
    }
    return this.http.get<Product>(`${baseUrl}/products/${idSlug}`)
    .pipe(
      tap((product) => console.log(product)),
      tap((product) => this.productCache.set(idSlug, product)),
    );
  }

  getProductById(id: string): Observable<Product>{
    if(this.productCache.has(id)){
      return of(this.productCache.get(id)!);
    }
    return this.http.get<Product>(`${baseUrl}/products/${id}`)
    .pipe(
      tap((product) => console.log(product)),
      tap((product) => this.productCache.set(id, product)),
    );
  }

  updateProduct(
    id: string,
    productLike: Partial<Product>
  ): Observable<Product>{
    return this.http.patch<Product>(`${baseUrl}/products/${id}`, productLike);
  }

}
