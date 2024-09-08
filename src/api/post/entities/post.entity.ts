import { UserEntity } from '@/api/user/entities/user.entity';
import { Uuid } from '@/common/types/common.type';
import { AbstractEntity } from '@/database/entities/abstract.entity';
import {
  Column,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';

@Entity('post')
export class PostEntity extends AbstractEntity {
  constructor(data?: Partial<PostEntity>) {
    super();
    Object.assign(this, data);
  }

  @PrimaryGeneratedColumn('uuid', { primaryKeyConstraintName: 'PK_post_id' })
  id!: Uuid;

  @Column()
  title!: string;

  @Column()
  slug!: string;

  @Column({ nullable: true })
  description?: string;

  @Column({ nullable: true })
  content?: string;

  @Column({ name: 'user_id' })
  userId!: Uuid;

  @JoinColumn({
    name: 'user_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'FK_post_user_id',
  })
  @ManyToOne(() => UserEntity, (user) => user.posts)
  user: Relation<UserEntity>;

  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'timestamptz',
    default: null,
  })
  deletedAt: Date;
}
