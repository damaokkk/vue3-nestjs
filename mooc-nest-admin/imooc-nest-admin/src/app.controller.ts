// Param: restful API 参数
// Query: url 参数
// Body: Post 参数
import { Controller, Get, Post, Put, Delete, Param, Query, Body, UseFilters } from '@nestjs/common';
import { AppService } from './app.service';
import { TestService } from './test.service';
import { HttpExceptionFilter } from './exception/http-exception.filter';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly testService: TestService,
  ) {}

  @Get('/')
  getHello(): string {
    return this.appService.getHello();
  }

  // Get: 获取数据
  // Post: 插入数据
  // Put: 更新数据
  // Delete: 删除数据
  @Get('/data/:id')
  @UseFilters(new HttpExceptionFilter())
  getData(@Param() params): string {
    return this.testService.getData(params);
  }

  @Get('/data')
  @UseFilters(new HttpExceptionFilter())
  getAllData() {
    return this.testService.getAllData();
  }

  @Post('/data')
  @UseFilters(new HttpExceptionFilter())
  addData(@Body() body, @Query() query) {
    return this.testService.addData(body, query);
  }

  @Put('/data')
  @UseFilters(new HttpExceptionFilter())
  updateData(@Body() body) {
    return this.testService.updateData(body);
  }

  @Delete('/data/:id')
  @UseFilters(new HttpExceptionFilter())
  deleteData(@Param() params) {
    return this.testService.deleteData(params);
  }
}
