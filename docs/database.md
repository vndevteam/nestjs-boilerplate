# Work with database

We use [TypeORM](https://typeorm.io/) as an ORM for working with databases. It supports MySQL, PostgreSQL, MariaDB, SQLite, MS SQL Server, Oracle, WebSQL databases.

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
