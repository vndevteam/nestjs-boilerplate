import { PostEntity } from '@/api/post/entities/post.entity';
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';

export class PostSeeder1722382752268 implements Seeder {
  track = false;

  public async run(
    _dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const postFactory = factoryManager.get(PostEntity);

    await postFactory.saveMany(10);
  }
}
