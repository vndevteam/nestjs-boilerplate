import { OffsetPaginatedDto } from '@/common/dto/offset-pagination/paginated.dto';
import { Uuid } from '@/common/types/common.type';
import { paginate } from '@/utils/offset-pagination';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import assert from 'assert';
import { plainToInstance } from 'class-transformer';
import { Repository } from 'typeorm';
import { ListUserReqDto } from '../user/dto/list-user.req.dto';
import { CreatePostReqDto } from './dto/create-post.req.dto';
import { PostResDto } from './dto/post.res.dto';
import { UpdatePostReqDto } from './dto/update-post.req.dto';
import { PostEntity } from './entities/post.entity';

@Injectable()
export class PostService {
  private readonly logger = new Logger(PostService.name);

  constructor(
    @InjectRepository(PostEntity)
    private readonly postRepository: Repository<PostEntity>,
  ) {}

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

  async create(reqDto: CreatePostReqDto) {
    const savedPost = await this.postRepository.save(new PostEntity(reqDto));
    this.logger.debug(savedPost);

    return plainToInstance(PostResDto, savedPost);
  }

  update(_id: Uuid, _reqDto: UpdatePostReqDto) {
    throw new Error('Method not implemented.');
  }

  delete(_id: Uuid) {
    throw new Error('Method not implemented.');
  }
}
