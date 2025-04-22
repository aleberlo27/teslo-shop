
import { Component, inject, input, OnInit } from '@angular/core';
import { Product } from '@products/interfaces/product.interface';
import { ProductCarouselComponent } from "../../../../products/components/product-carousel/product-carousel.component";
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormUtils } from '@utils/form-utils';
import { FormErrorLabelComponent } from "../../../../shared/Components/form-error-label/form-error-label.component";
import { ProductsService } from '@products/services/products.service';
import { Router } from '@angular/router';

@Component({
  selector: 'product-details',
  imports: [ProductCarouselComponent, ReactiveFormsModule, FormErrorLabelComponent],
  templateUrl: './product-details.component.html',
})
export class ProductDetailsComponent implements OnInit {

  product = input.required<Product>();

  router = inject(Router);
  fb = inject(FormBuilder);

  productService = inject(ProductsService);

  productForm = this.fb.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    slug: ['', [Validators.required, Validators.pattern(FormUtils.slugPattern)]],
    price: [0,[Validators.required, Validators.min(0)]],
    stock:[0, [Validators.required, Validators.min(0)]],
    sizes: [['']],
    images: [[]],
    tags:[''],
    gender: ['men', [Validators.required, Validators.pattern(/men|women|kid|unisex/)]],
  })

  sizes = ['XS','S','M', 'L', 'XL', 'XXL'];

  setFormValue(formLike: Partial<Product>){
    //this.productForm.reset(formLike as any);
    this.productForm.patchValue(formLike as any);
    this.productForm.patchValue({tags: formLike.tags?.join(',')});
  }

  onSizeClicked(size: string){
    const currentSizes = this.productForm.value.sizes ?? [];
    if(currentSizes.includes(size)){
      currentSizes.splice(currentSizes.indexOf(size), 1);
    }else{
      currentSizes.push(size);
    }

    this.productForm.patchValue({sizes: currentSizes});
  }

  ngOnInit(): void {
    this.setFormValue(this.product());
  }

  onSubmit() {
    const isValid = this.productForm.valid;
    this.productForm.markAllAsTouched();

    if(!isValid) return;

    const formValue = this.productForm.value;

    const productLike: Partial<Product> ={
      ...(formValue as any),
      tags: formValue.tags?.toLowerCase().split(',').map(
        tag => tag.trim()) ?? [],
    }

    if(this.product().id == 'new'){
      //crear producto
      this.productService.createProduct(productLike).subscribe(product => {
        console.log('Producto creado');
        this.router.navigate(['/admin/products', product.id])
      })
    }else{
      this.productService
        .updateProduct(this.product().id, productLike)
        .subscribe((product) => {
          console.log('Producto actualizado');
        }
      );
    }

  }

}
