import { ApiPublic } from '@/decorators/http.decorators';
import { Public } from '@/decorators/public.decorator';
import { Controller, Get } from '@nestjs/common';

@Controller('/')
export class HomeController {
  @Get()
  @Public()
  @ApiPublic({ summary: 'Home' })
  home() {
    return 'Welcome to the API';
  }
}
