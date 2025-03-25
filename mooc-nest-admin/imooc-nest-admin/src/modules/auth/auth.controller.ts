import { Body, Controller, Get, Post, UseFilters } from '@nestjs/common';
import { Public } from './public.decorator';
import { AuthService } from './auth.service';
import { HttpExceptionFilter } from '../../exception/http-exception.filter';
import { success, error, wrapperResponse } from '../../utils';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
  ) {}


  @Public()
  @Post('login')
  @UseFilters(new HttpExceptionFilter())
  login(@Body() params) {
    return wrapperResponse(
      this.authService.login(params.username, params.password),
      '登录成功',
    );
  }
}
