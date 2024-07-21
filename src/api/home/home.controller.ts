import { Controller, Get } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';

@Controller('/')
export class HomeController {
  @ApiOperation({ summary: 'Home' })
  @Get()
  home() {
    return 'Welcome to the API';
  }
}
