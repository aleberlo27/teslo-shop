import { Component, signal } from '@angular/core';
import { ProductCardComponent } from "../../../components/product-card/product-card.component";

@Component({
  selector: 'app-home-page',
  imports: [ProductCardComponent],
  templateUrl: './home-page.component.html',
})
export class HomePageComponent {
  products = signal([

  ]);


}
