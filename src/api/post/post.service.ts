import { Uuid } from '@/common/types/common.type';
import { Injectable } from '@nestjs/common';
import { PostEntity } from './entities/post.entity';

@Injectable()
export class PostService {
  constructor() {}

  findMany() {
    throw new Error('Method not implemented.');
  }
  findOne(id: Uuid) {
    return PostEntity.findOneBy({ id });
  }

  create() {
    throw new Error('Method not implemented.');
  }

  update(_id: Uuid) {
    throw new Error('Method not implemented.');
  }

  delete(_id: Uuid) {
    throw new Error('Method not implemented.');
  }
}
