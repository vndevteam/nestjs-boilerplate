import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserReqDto } from './dto/create-user.req.dto';
import { UpdateUserReqDto } from './dto/update-user.req.dto';
import { UserResDto } from './dto/user.res.dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { ErrorDto } from '@/common/dto/error.dto';
import { ApiPaginatedResponse } from '@/decorators/swagger.decorator';
import { ListUserReqDto } from './dto/list-user.req.dto';
import { PaginatedDto } from '@/common/dto/paginated.dto';

@ApiTags('users')
@ApiInternalServerErrorResponse({
  type: ErrorDto,
  description: 'Internal server error',
})
@ApiBadRequestResponse({
  type: ErrorDto,
  description: 'Bad request',
})
@Controller({
  path: 'users',
  version: '1',
})
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiCreatedResponse({ type: UserResDto })
  @ApiUnprocessableEntityResponse({
    type: ErrorDto,
    description: 'Validation error',
  })
  async create(@Body() createUserDto: CreateUserReqDto): Promise<UserResDto> {
    return await this.userService.create(createUserDto);
  }

  @Get()
  @ApiPaginatedResponse(UserResDto)
  async findAll(
    @Query() reqDto: ListUserReqDto,
  ): Promise<PaginatedDto<UserResDto>> {
    return await this.userService.findAll(reqDto);
  }

  @Get(':id')
  @ApiOkResponse({ type: UserResDto })
  async findOne(@Param('id') id: string): Promise<UserResDto> {
    return await this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() UpdateUserReqDto: UpdateUserReqDto) {
    return this.userService.update(+id, UpdateUserReqDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
