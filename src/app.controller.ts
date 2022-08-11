import { Controller, Get, Param, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/new/:idada')
  newEndpoint(
    @Param('idada') id: number,
    @Query('lastKey') lastKey = '0',
    @Query('order') ordera = 'priority',
  ) {
    return `${id} and ${lastKey}, ${ordera}`;
  }

  @Get('tasks')
  tasks() {
    return this.appService.getTasks();
  }
}
