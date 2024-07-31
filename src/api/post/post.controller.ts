import { OffsetPaginatedDto } from '@/common/dto/offset-pagination/paginated.dto';
import { Uuid } from '@/common/types/common.type';
import { ApiAuth } from '@/decorators/http.decorators';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { ListUserReqDto } from '../user/dto/list-user.req.dto';
import { CreatePostReqDto } from './dto/create-post.req.dto';
import { PostResDto } from './dto/post.res.dto';
import { UpdatePostReqDto } from './dto/update-post.req.dto';
import { PostService } from './post.service';

@ApiTags('posts')
@Controller({
  path: 'posts',
  version: '1',
})
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  @ApiAuth({
    type: PostResDto,
    summary: 'Get posts',
    isPaginated: true,
  })
  async findMany(
    @Query() reqDto: ListUserReqDto,
  ): Promise<OffsetPaginatedDto<PostResDto>> {
    return this.postService.findMany(reqDto);
  }

  @Get(':id')
  @ApiAuth({
    type: PostResDto,
    summary: 'Get post by id',
  })
  @ApiParam({ name: 'id', type: 'String' })
  async findOne(@Param('id', ParseUUIDPipe) id: Uuid) {
    return this.postService.findOne(id);
  }

  @Post()
  @ApiAuth({
    type: PostResDto,
    summary: 'Create post',
  })
  async create(@Body() reqDto: CreatePostReqDto) {
    return this.postService.create(reqDto);
  }

  @Patch(':id')
  @ApiAuth({
    type: PostResDto,
    summary: 'Update post by id',
  })
  @ApiParam({ name: 'id', type: 'String' })
  async update(
    @Param('id', ParseUUIDPipe) id: Uuid,
    @Body() reqDto: UpdatePostReqDto,
  ) {
    return this.postService.update(id, reqDto);
  }

  @Delete(':id')
  @ApiAuth({
    summary: 'Delete post',
  })
  @ApiParam({ name: 'id', type: 'String' })
  async delete(@Param('id', ParseUUIDPipe) id: Uuid) {
    return this.postService.delete(id);
  }
}
