import { inject, Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';

@Injectable({providedIn: 'root'})
export class PaginationService {
  private activatedRoute = inject(ActivatedRoute);

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
  );

}
