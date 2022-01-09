import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from '../entities/product.entity';
import { CreateProductDto, UpdateProductDto } from '../dtos/products.dto';

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
    const product = this.products.find((item) => item.id === id);
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return product;
  }

  create(payload: CreateProductDto) {
    this.counter = this.counter + 1;
    const newProduct = {
      id: this.counter,
      ...payload,
    };
    this.products.push(newProduct);
    return newProduct;
  }

  update(id: number, payload: UpdateProductDto) {
    const productToUpdateIndex = this.products.findIndex(function (product) {
      return product.id === id;
    });
    if (productToUpdateIndex === -1) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    this.products[productToUpdateIndex] = {
      ...this.products[productToUpdateIndex],
      ...payload,
    };
    return this.products[productToUpdateIndex];
  }

  delete(id: number) {
    const productToRemoveIndex = this.products.findIndex(function (product) {
      return product.id === id;
    });

    if (productToRemoveIndex === -1) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    this.products.splice(productToRemoveIndex, 1);
    return true;
  }
}
