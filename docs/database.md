# Work with database

We use [TypeORM](https://typeorm.io/) as an ORM for working with databases. It supports MySQL, PostgreSQL, MariaDB, SQLite, MS SQL Server, Oracle, WebSQL databases.

For seeding data, we use [typeorm-extension](https://github.com/tada5hi/typeorm-extension) package.

---

[[toc]]

## Working with database entity (TypeORM)

### Generate migration

1. Create entity file with extension `.entity.ts`. For example `post.entity.ts`:

    ```typescript
    // /src/api/post/entities/post.entity.ts

    import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

    @Entity()
    export class PostEntity {
      @PrimaryGeneratedColumn()
      id: number;

      @Column()
      title: string;

      @Column()
      content: string;

      // Here any fields that you need
    }
    ```

1. Next, generate migration file:

    ```bash
    pnpm migration:generate src/database/migrations/create-post-table
    ```

1. Apply this migration to database via [pnpm migration:up](#run-migration).

### Show migration

```bash
pnpm migration:show
```

### Run migration

```bash
pnpm migration:up
```

### Revert migration

```bash
pnpm migration:down
```

## Seeding (TypeORM)

### Creating seed file

1. Create seed file with `pnpm seed:create` command:

    ```bash
    pnpm seed:create -n src/database/seeds/post-seeder
    ```

2. Go to `src/database/seeds/xxxtimestampxxx-post-seeder.ts` and write your seed data:

    ```typescript
    // /src/database/seeds/xxxtimestampxxx-post-seeder.ts
    import { PostEntity } from '@/api/post/entities/post.entity';
    import { DataSource } from 'typeorm';
    import { Seeder, SeederFactoryManager } from 'typeorm-extension';

    export class PostSeederxxxtimestampxxx implements Seeder {
      track = false;

      public async run(
        dataSource: DataSource,
        factoryManager: SeederFactoryManager,
      ): Promise<any> {
        // Creating post by using repository
        const repository = dataSource.getRepository(PostEntity);
        await repository.insert(
          new PostEntity({
            title: 'Post 1',
            content: 'Content 1',
          }),
        );

        // Creating post by using factory
        const postFactory = factoryManager.get(PostEntity);
        await postFactory.saveMany(5);
      }
    }
    ```

    In `run` method extend your logic, you can use repository or factory to create data.

3. Apply this seed to database via `pnpm seed:run`.

### Running seed

```bash
pnpm seed:run
```

### Factory and Faker

To create entities with random data, create a factory for each desired entity. The definition of a factory is **optional**. If you don't define a factory, the seeder will use the repository to create entities.

The factory callback provides an instance of the [faker](https://fakerjs.dev/guide/) library as function argument, to populate the entity with random data.

1. Create factory file at `src/database/factories/post.factory.ts`:

    ```typescript
    import { PostEntity } from '@/api/post/entities/post.entity';
    import { setSeederFactory } from 'typeorm-extension';

    export default setSeederFactory(PostEntity, (fake) => {
      const post = new PostEntity();
      post.title = fake.lorem.sentence();
      post.content = fake.lorem.paragraph();

      return post;
    });
    ```

2. Use factory in `src/database/seeds/xxxtimestampxxx-post-seeder.ts`
3. Run seed:

    ```bash
    pnpm seed:run
    ```
