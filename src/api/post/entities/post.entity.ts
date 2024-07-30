import { Uuid } from '@/common/types/common.type';
import { AbstractEntity } from '@/database/entities/abstract.entity';
import {
  Column,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
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
  slug!: string;

  @Column()
  title!: string;

  @Column({ nullable: true })
  description?: string;

  @Column({ nullable: true })
  content?: string;

  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'timestamptz',
    default: null,
  })
  deletedAt: Date;
}
