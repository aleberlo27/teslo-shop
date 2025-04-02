import { Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ProductCardComponent } from '@products/components/product-card/product-card.component';
import { ProductsService } from '@products/services/products.service';
//import { ProductCardComponent } from "../../../components/product-card/product-card.component";
import { PaginationComponent } from '@shared/Components/pagination/pagination.component';
import { PaginationService } from '@shared/Components/pagination/pagination.service';


@Component({
  selector: 'app-home-page',
  imports: [ProductCardComponent, PaginationComponent],
  templateUrl: './home-page.component.html',
})
export class HomePageComponent {
  private productService = inject(ProductsService);
  paginationService = inject(PaginationService);

  /*  COMENTADO PORQUE SE HA HECHO UN SERVICIO A NIVEL DE SHARED/COMPONENTS/PAGINATION
  activatedRoute = inject(ActivatedRoute);

  //Coger la PAGINACIÓN de la ruta activa:
  currentPage = toSignal(
    this.activatedRoute.queryParamMap.pipe(
      //Coge el parámetro de la página, si no hay, la página será : 1
      map( params => (params.get('page') ? + params.get('page')! : 1 )),
      //Si el usuario mete en la url algo diferente a la página, por ej 'http://localhost:4200/?page=1adfasdwe3'
      map( page => (isNaN(page) ? 1 : page)) //Si no es un número (isNaN) se pone la página en 1
    ),
    {
      //si nos devolviera undefined el valor inicial de esta señal sería 1
      initialValue: 1,
    }
  ); */

  //Devuelve la respuesta del servicio de products
  productsResource = rxResource({
    request: () => ({ page: this.paginationService.currentPage() - 1}), //-1 porque la última no sale al * 12 en el offset
    loader: ({request}) => {
      return this.productService.getProducts({
        //Ponemos el parámetro con el número de la página y los 12 artículos que quiero que salga
        offset: request.page * 12
      });
    },
  });


}
