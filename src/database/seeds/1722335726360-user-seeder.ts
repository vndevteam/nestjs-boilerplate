import { UserEntity } from '@/api/user/entities/user.entity';
import { SYSTEM_USER_ID } from '@/constants/app.constant';
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';

export class UserSeeder1722335726360 implements Seeder {
  track = false;

  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const repository = dataSource.getRepository(UserEntity);

    const adminUser = await repository.findOneBy({ username: 'admin' });
    if (!adminUser) {
      await repository.insert(
        new UserEntity({
          username: 'admin',
          email: 'admin@example.com',
          password: '12345678',
          bio: "hello, i'm a backend developer",
          image: 'https://example.com/avatar.png',
          createdBy: SYSTEM_USER_ID,
          updatedBy: SYSTEM_USER_ID,
        }),
      );
    }

    const userFactory = factoryManager.get(UserEntity);
    await userFactory.saveMany(5);
  }
}
