import { AbstractEntity } from '@/database/entities/abstract.entity';
import { hashPassword as hashPass } from '@/utils/password.util';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  DeleteDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SessionEntity } from './session.entity';

@Entity('user')
export class UserEntity extends AbstractEntity {
  constructor(data?: Partial<UserEntity>) {
    super();
    Object.assign(this, data);
  }

  @PrimaryGeneratedColumn('uuid', { primaryKeyConstraintName: 'PK_user_id' })
  id!: string;

  @Column()
  @Index('UQ_user_username', {
    where: '"deleted_at" IS NULL',
    unique: true,
  })
  username!: string;

  @Column()
  @Index('UQ_user_email', { where: '"deleted_at" IS NULL', unique: true })
  email!: string;

  @Column()
  password!: string;

  @Column({ default: '' })
  bio?: string;

  @Column({ default: '' })
  image?: string;

  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'timestamptz',
    default: null,
  })
  deletedAt: Date;

  @OneToMany(() => SessionEntity, (session) => session.user)
  sessions?: SessionEntity[];

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (this.password) {
      this.password = await hashPass(this.password);
    }
  }
}
