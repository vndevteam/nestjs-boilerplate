import { PaginatedDto } from '@/common/dto/paginated.dto';
import { CurrentUser } from '@/decorators/current-user.decorator';
import { ApiAuth } from '@/decorators/http.decorators';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserReqDto } from './dto/create-user.req.dto';
import { ListUserReqDto } from './dto/list-user.req.dto';
import { UpdateUserReqDto } from './dto/update-user.req.dto';
import { UserResDto } from './dto/user.res.dto';
import { UserService } from './user.service';

@ApiTags('users')
@Controller({
  path: 'users',
  version: '1',
})
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiAuth({
    type: UserResDto,
    summary: 'Get current user',
  })
  @Get('me')
  async getCurrentUser(@CurrentUser('id') userId: string): Promise<UserResDto> {
    return await this.userService.findOne(userId);
  }

  @Post()
  @ApiAuth({
    type: UserResDto,
    summary: 'Create user',
    statusCode: HttpStatus.CREATED,
  })
  async create(@Body() createUserDto: CreateUserReqDto): Promise<UserResDto> {
    return await this.userService.create(createUserDto);
  }

  @Get()
  @ApiAuth({
    type: UserResDto,
    summary: 'List users',
    isPaginated: true,
  })
  async findAll(
    @Query() reqDto: ListUserReqDto,
  ): Promise<PaginatedDto<UserResDto>> {
    return await this.userService.findAll(reqDto);
  }

  @Get(':id')
  @ApiAuth({ type: UserResDto, summary: 'Find user by id' })
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<UserResDto> {
    return await this.userService.findOne(id);
  }

  @Patch(':id')
  @ApiAuth({ type: UserResDto, summary: 'Update user' })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() UpdateUserReqDto: UpdateUserReqDto,
  ) {
    return this.userService.update(id, UpdateUserReqDto);
  }

  @Delete(':id')
  @ApiAuth({
    summary: 'Delete user',
    errorResponses: [400, 401, 403, 404, 500],
  })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.userService.remove(id);
  }

  @ApiAuth()
  @Post('me/change-password')
  async changePassword() {
    return 'change-password';
  }
}
