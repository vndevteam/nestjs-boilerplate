import { plainToInstance } from 'class-transformer';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DataSource,
  UpdateDateColumn,
} from 'typeorm';
import { getOrder, Order } from '../decorators/order.decorator';

export abstract class AbstractEntity extends BaseEntity {
  @Order(9999)
  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    nullable: false,
  })
  createdAt: Date;

  @Order(9999)
  @Column({
    name: 'created_by',
    type: 'varchar',
    nullable: false,
  })
  createdBy: string;

  @Order(9999)
  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    nullable: false,
  })
  updatedAt: Date;

  @Order(9999)
  @Column({
    name: 'updated_by',
    type: 'varchar',
    nullable: false,
  })
  updatedBy: string;

  toDto<Dto>(dtoClass: new () => Dto): Dto {
    return plainToInstance(dtoClass, this);
  }

  static useDataSource(dataSource: DataSource) {
    BaseEntity.useDataSource.call(this, dataSource);
    const meta = dataSource.entityMetadatasMap.get(this);
    if (meta != null) {
      // reorder columns here
      meta.columns = [...meta.columns].sort((x, y) => {
        const orderX = getOrder((x.target as any)?.prototype, x.propertyName);
        const orderY = getOrder((y.target as any)?.prototype, y.propertyName);
        return orderX - orderY;
      });
    }
  }
}
