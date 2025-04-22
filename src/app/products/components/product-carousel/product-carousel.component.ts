import { AfterViewInit, Component, ElementRef, input, viewChild } from '@angular/core';
//IMPORTS DE SWIPER (antes hacer un npm install swiper)
import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { ProductImagePipe } from "../../pipes/product-image.pipe";

@Component({
  selector: 'product-carousel',
  imports: [ProductImagePipe],
  templateUrl: './product-carousel.component.html',
  styles: `
    .swiper{
      width: 100%;
      height: auto;

    }
  `,
})
export class ProductCarouselComponent implements AfterViewInit {

  images = input.required<string[]>();
  //Cogemos el elemento del html a través de la referencia: swiperDiv
  swiperDiv = viewChild.required<ElementRef>('swiperDiv');

  ngAfterViewInit() {
    const element = this.swiperDiv().nativeElement;
    const shouldLoop = this.images.length > 1; // Activar loop solo si hay más de 1 imagen
    if(!element) return;
    const swiper = new Swiper(element, {
      // Optional parameters
      direction: 'horizontal',
      loop: shouldLoop,
      //Con los módulos sale los puntitos de cuántas imágenes hay en el swiper (paginacion)
      modules:[
        Navigation, Pagination
      ],

      // If we need pagination
      pagination: {
        el: '.swiper-pagination',
      },

      // Navigation arrows
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },

      // And if we need scrollbar
      scrollbar: {
        el: '.swiper-scrollbar',
      },
    });
  }
}
