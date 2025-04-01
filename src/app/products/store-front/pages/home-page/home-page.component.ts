import { Component, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ProductCardComponent } from '@products/components/product-card/product-card.component';
import { ProductsService } from '@products/services/products.service';
//import { ProductCardComponent } from "../../../components/product-card/product-card.component";

@Component({
  selector: 'app-home-page',
  imports: [ProductCardComponent],
  templateUrl: './home-page.component.html',
})
export class HomePageComponent {
  private productService = inject(ProductsService)

  //Devuelve la respuesta del servicio de products
  productsResource = rxResource({
    request: () => ({}),
    loader: ({request}) => {
      return this.productService.getProducts({
        gender: 'men',
      });
    },
  });


}
