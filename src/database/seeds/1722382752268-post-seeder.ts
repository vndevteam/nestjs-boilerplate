import { PostEntity } from '@/api/post/entities/post.entity';
import { UserEntity } from '@/api/user/entities/user.entity';
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';

export class PostSeeder1722382752268 implements Seeder {
  track = false;

  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const userRepository = dataSource.getRepository(UserEntity);
    const adminUser = await userRepository.findOneBy({ username: 'admin' });
    if (adminUser) {
      const postFactory = factoryManager.get(PostEntity);
      await postFactory.saveMany(10, { userId: adminUser.id });
    }
  }
}
