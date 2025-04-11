import { CurrencyPipe } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { Product } from '@products/interfaces/product.interface';
import { ProductImagePipe } from '@products/pipes/product-image.pipe';
import { ProductsService } from '@products/services/products.service';
import { PaginationService } from '@shared/Components/pagination/pagination.service';

@Component({
  selector: 'product-table',
  imports: [ProductImagePipe, RouterLink, CurrencyPipe],
  templateUrl: './product-table.component.html',
})
export class ProductTableComponent {

  products = input.required<Product[]>();
 /*  private productService = inject(ProductsService);
  paginationService = inject(PaginationService);

  //Devuelve la respuesta del servicio de products
  products = rxResource({
    request: () => ({ page: this.paginationService.currentPage() - 1}), //-1 porque la última no sale al * 12 en el offset
    loader: ({request}) => {
      return this.productService.getProducts({
        //Ponemos el parámetro con el número de la página y los 12 artículos que quiero que salga
        offset: request.page * 12
      });
    },
  }); */

}
