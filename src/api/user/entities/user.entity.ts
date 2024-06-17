import { AbstractEntity } from '@/database/entities/abstract.entity';
import { hashPassword as hashPass } from '@/utils/password.util';
import {
  BeforeInsert,
  Column,
  DeleteDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('user')
export class UserEntity extends AbstractEntity {
  constructor(data?: Partial<UserEntity>) {
    super();
    Object.assign(this, data);
  }

  @PrimaryGeneratedColumn({ primaryKeyConstraintName: 'PK_user_id' })
  id!: number;

  @Column()
  @Index('UQ_IDX_user_username', {
    where: '"deleted_at" IS NULL',
    unique: true,
  })
  username!: string;

  @Column()
  @Index('UQ_IDX_user_email', { where: '"deleted_at" IS NULL', unique: true })
  email!: string;

  @Column()
  password!: string;

  @Column({ default: '' })
  bio?: string;

  @Column({ default: '' })
  image: string;

  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'timestamp',
    default: null,
  })
  deletedAt: Date;

  @BeforeInsert()
  async hashPassword() {
    this.password = await hashPass(this.password);
  }
}
