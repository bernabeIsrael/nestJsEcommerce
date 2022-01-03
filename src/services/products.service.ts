import { Injectable } from '@nestjs/common';
import { Product } from '../entities/product.entity';

@Injectable()
export class ProductsService {
  private counter = 1;
  private products: Product[] = [
    {
      id: 1,
      name: 'Product 1',
      description: 'Product 1 description',
      price: 122,
      stock: 20,
      image: 'url',
    },
  ];

  findAll() {
    return this.products;
  }

  findOne(id: number) {
    return this.products.find((item) => item.id === id);
  }

  create(payload: any) {
    this.counter = this.counter + 1;
    const newProduct = {
      id: this.counter,
      ...payload,
    };
    this.products.push(newProduct);
    return newProduct;
  }

  update(id, payload) {
    const productToUpdateIndex = this.products.findIndex(function (product) {
      return product.id === id;
    });
    if (productToUpdateIndex === -1) {
      return false;
    }
    this.products[productToUpdateIndex] = {
      ...this.products[productToUpdateIndex],
      ...payload,
    };
    return this.products[productToUpdateIndex];
  }

  delete(id) {
    const productToRemoveIndex = this.products.findIndex(function (product) {
      return product.id === id;
    });

    if (productToRemoveIndex !== -1) {
      this.products.splice(productToRemoveIndex, 1);
    }
  }
}
