import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProductsService } from '../../services/products.service';
import { ParseIntPipe } from '../../common/parse-int.pipe';
import { CreateProductDto, UpdateProductDto } from '../../dtos/products.dto';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  getProducts() {
    return {
      products: this.productsService.findAll(),
    };
  }

  @Get('/:productId')
  getOne(@Param('productId', ParseIntPipe) productId: number) {
    return {
      product: this.productsService.findOne(productId),
    };
  }

  @Post()
  create(@Body() payload: CreateProductDto) {
    return {
      product: this.productsService.create(payload),
    };
  }

  @Put('/:id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateProductDto,
  ) {
    return {
      product: this.productsService.update(id, payload),
    };
  }

  @Delete('/:id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.delete(id);
  }
}
