import { OffsetPaginatedDto } from '@/common/dto/offset-pagination/paginated.dto';
import { Uuid } from '@/common/types/common.type';
import { paginate } from '@/utils/offset-pagination';
import { Injectable } from '@nestjs/common';
import assert from 'assert';
import { plainToInstance } from 'class-transformer';
import { ListUserReqDto } from '../user/dto/list-user.req.dto';
import { CreatePostReqDto } from './dto/create-post.req.dto';
import { PostResDto } from './dto/post.res.dto';
import { UpdatePostReqDto } from './dto/update-post.req.dto';
import { PostEntity } from './entities/post.entity';

@Injectable()
export class PostService {
  constructor() {}

  async findMany(
    reqDto: ListUserReqDto,
  ): Promise<OffsetPaginatedDto<PostResDto>> {
    const query = PostEntity.createQueryBuilder('post').orderBy(
      'post.createdAt',
      'DESC',
    );
    const [posts, metaDto] = await paginate<PostEntity>(query, reqDto, {
      skipCount: false,
      takeAll: false,
    });

    return new OffsetPaginatedDto(plainToInstance(PostResDto, posts), metaDto);
  }

  async findOne(id: Uuid): Promise<PostResDto> {
    assert(id, 'id is required');
    const post = await PostEntity.findOneByOrFail({ id });

    return post.toDto(PostResDto);
  }

  create(_reqDto: CreatePostReqDto) {
    throw new Error('Method not implemented.');
  }

  update(_id: Uuid, _reqDto: UpdatePostReqDto) {
    throw new Error('Method not implemented.');
  }

  delete(_id: Uuid) {
    throw new Error('Method not implemented.');
  }
}
