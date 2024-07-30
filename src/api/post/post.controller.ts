import { Uuid } from '@/common/types/common.type';
import { ApiAuth } from '@/decorators/http.decorators';
import {
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PostResDto } from './dto/post.res.dto';
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
  async findMany() {
    return this.postService.findMany();
  }

  @Get(':id')
  @ApiAuth({
    type: PostResDto,
    summary: 'Get post by id',
  })
  async findOne(@Param('id', ParseUUIDPipe) id: Uuid) {
    return this.postService.findOne(id);
  }

  @Post()
  @ApiAuth({
    type: PostResDto,
    summary: 'Create post',
  })
  async create() {
    return this.postService.create();
  }

  @Put(':id')
  @ApiAuth({
    type: PostResDto,
    summary: 'Update post by id',
  })
  async update(@Param('id', ParseUUIDPipe) id: Uuid) {
    return this.postService.update(id);
  }

  @Delete(':id')
  @ApiAuth({
    summary: 'Delete post',
  })
  async delete(@Param('id', ParseUUIDPipe) id: Uuid) {
    return this.postService.delete(id);
  }
}
