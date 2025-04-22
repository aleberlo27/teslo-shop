import { Component, inject, signal } from '@angular/core';
import { ProductTableComponent } from "../../../products/components/product-table/product-table.component";
import { PaginationComponent } from "../../../shared/Components/pagination/pagination.component";
import { rxResource } from '@angular/core/rxjs-interop';
import { ProductsService } from '@products/services/products.service';
import { PaginationService } from '@shared/Components/pagination/pagination.service';
import { LiteralPrimitive } from '@angular/compiler';
import { producerUpdateValueVersion } from '@angular/core/primitives/signals';

@Component({
  selector: 'app-products-admin-page',
  imports: [ProductTableComponent, PaginationComponent],
  templateUrl: './products-admin-page.component.html',
})
export class ProductsAdminPageComponent {
  private productService = inject(ProductsService);
  paginationService = inject(PaginationService);

  productsPerPage = signal(10);

  //Devuelve la respuesta del servicio de products
  productsResource = rxResource({
    request: () => ({
      page: this.paginationService.currentPage() - 1,
      limit: this.productsPerPage(),
    }), //-1 porque la última no sale al * 12 en el offset
    loader: ({request}) => {
      return this.productService.getProducts({
        //Ponemos el parámetro con el número de la página y los 12 artículos que quiero que salga
        offset: request.page * 12,
        limit: request.limit
      });
    },
  });

}
