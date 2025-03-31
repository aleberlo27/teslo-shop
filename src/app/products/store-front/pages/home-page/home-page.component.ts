import { Component, signal } from '@angular/core';
import { ProductPageComponent } from "../product-page/product-page.component";

@Component({
  selector: 'app-home-page',
  imports: [ProductPageComponent],
  templateUrl: './home-page.component.html',
})
export class HomePageComponent {
  products = signal([

  ]);


}
