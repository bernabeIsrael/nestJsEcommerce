import { Body, Controller, Post } from '@nestjs/common';

@Controller('products')
export class ProductsController {
  @Post()
  create(@Body() payload: any) {
    return {
      message: 'Message',
      data: payload,
    };
  }
}
