import {
  Brackets,
  ObjectType,
  SelectQueryBuilder,
  WhereExpressionBuilder,
  type ObjectLiteral,
} from 'typeorm';

export function buildPaginator<Entity extends ObjectLiteral>(
  options: PaginationOptions<Entity>,
): Paginator<Entity> {
  const {
    entity,
    query = {},
    alias = entity.name.toLowerCase(),
    paginationKeys = ['id' as any],
  } = options;

  const paginator = new Paginator(entity, paginationKeys);

  paginator.setAlias(alias);

  if (query.afterCursor) {
    paginator.setAfterCursor(query.afterCursor);
  }

  if (query.beforeCursor) {
    paginator.setBeforeCursor(query.beforeCursor);
  }

  if (query.limit) {
    paginator.setLimit(query.limit);
  }

  if (query.order) {
    paginator.setOrder(query.order as Order);
  }

  return paginator;
}

export default class Paginator<Entity extends ObjectLiteral> {
  private afterCursor: string | null = null;

  private beforeCursor: string | null = null;

  private nextAfterCursor: string | null = null;

  private nextBeforeCursor: string | null = null;

  private alias: string | null = null;

  private limit = 100;

  private order: Order = Order.DESC;

  public constructor(
    private entity: ObjectType<Entity>,
    private paginationKeys: Extract<keyof Entity, string>[],
  ) {
    this.alias = pascalToUnderscore(this.entity.name);
  }

  public setAlias(alias: string): void {
    this.alias = alias;
  }

  public setAfterCursor(cursor: string): void {
    this.afterCursor = cursor;
  }

  public setBeforeCursor(cursor: string): void {
    this.beforeCursor = cursor;
  }

  public setLimit(limit: number): void {
    this.limit = limit;
  }

  public setOrder(order: Order): void {
    this.order = order;
  }

  public async paginate(
    builder: SelectQueryBuilder<Entity>,
  ): Promise<PagingResult<Entity>> {
    const entities = await this.appendPagingQuery(builder).getMany();
    const hasMore = entities.length > this.limit;

    if (hasMore) {
      entities.splice(entities.length - 1, 1);
    }

    if (entities.length === 0) {
      return this.toPagingResult(entities);
    }

    if (!this.hasAfterCursor() && this.hasBeforeCursor()) {
      entities.reverse();
    }

    if (this.hasBeforeCursor() || hasMore) {
      this.nextAfterCursor = this.encode(entities[entities.length - 1]);
    }

    if (this.hasAfterCursor() || (hasMore && this.hasBeforeCursor())) {
      this.nextBeforeCursor = this.encode(entities[0]);
    }

    return this.toPagingResult(entities);
  }

  private getCursor(): Cursor {
    return {
      afterCursor: this.nextAfterCursor,
      beforeCursor: this.nextBeforeCursor,
    };
  }

  private appendPagingQuery(
    builder: SelectQueryBuilder<Entity>,
  ): SelectQueryBuilder<Entity> {
    const cursors: CursorParam = {};
    const clonedBuilder = new SelectQueryBuilder<Entity>(builder);

    if (this.hasAfterCursor()) {
      Object.assign(cursors, this.decode(this.afterCursor as string));
    } else if (this.hasBeforeCursor()) {
      Object.assign(cursors, this.decode(this.beforeCursor as string));
    }

    if (Object.keys(cursors).length > 0) {
      clonedBuilder.andWhere(
        new Brackets((where) => this.buildCursorQuery(where, cursors)),
      );
    }

    clonedBuilder.take(this.limit + 1);

    const paginationKeyOrders = this.buildOrder();
    Object.keys(paginationKeyOrders).forEach((orderKey) => {
      clonedBuilder.addOrderBy(
        orderKey,
        paginationKeyOrders[orderKey] === 'ASC' ? 'ASC' : 'DESC',
      );
    });

    return clonedBuilder;
  }

  /**
   * Original method from the library
   * @param where WhereExpressionBuilder
   * @param cursors CursorParam
   */
  private _buildCursorQuery(
    where: WhereExpressionBuilder,
    cursors: CursorParam,
  ): void {
    const operator = this.getOperator();
    const params: CursorParam = {};
    let query = '';
    this.paginationKeys.forEach((key) => {
      params[key] = cursors[key];
      where.orWhere(`${query}${this.alias}.${key} ${operator} :${key}`, params);
      query = `${query}${this.alias}.${key} = :${key} AND `;
    });
  }

  /**
   * Only support PostgreSQL
   * @param where WhereExpressionBuilder
   * @param cursors CursorParam
   */
  private async buildCursorQuery(
    where: WhereExpressionBuilder,
    cursors: CursorParam,
  ) {
    const operator = this.getOperator();
    const params: CursorParam = {};
    let query = '';
    for (const key of this.paginationKeys) {
      params[key] = cursors[key];
      const type = this.getEntityPropertyType(key);
      if (type === 'date') {
        where.orWhere(
          `${query}date_trunc('milliseconds', ${this.alias}.${key}) ${operator} :${key}`,
          params,
        );
        query = `${query}date_trunc('milliseconds', ${this.alias}.${key}) = :${key} AND `;
      } else {
        where.orWhere(
          `${query}${this.alias}.${key} ${operator} :${key}`,
          params,
        );
        query = `${query}${this.alias}.${key} = :${key} AND `;
      }
    }
  }

  private getOperator(): string {
    if (this.hasAfterCursor()) {
      return this.order === Order.ASC ? '>' : '<';
    }

    if (this.hasBeforeCursor()) {
      return this.order === Order.ASC ? '<' : '>';
    }

    return '=';
  }

  private buildOrder(): OrderByCondition {
    let { order } = this;

    if (!this.hasAfterCursor() && this.hasBeforeCursor()) {
      order = this.flipOrder(order);
    }

    const orderByCondition: OrderByCondition = {};
    this.paginationKeys.forEach((key) => {
      orderByCondition[`${this.alias}.${key}`] = order;
    });

    return orderByCondition;
  }

  private hasAfterCursor(): boolean {
    return this.afterCursor !== null;
  }

  private hasBeforeCursor(): boolean {
    return this.beforeCursor !== null;
  }

  private encode(entity: Entity): string {
    const payload = this.paginationKeys
      .map((key) => {
        const type = this.getEntityPropertyType(key);
        const value = encodeByType(type, entity[key]);
        return `${key}:${value}`;
      })
      .join(',');

    return btoa(payload);
  }

  private decode(cursor: string): CursorParam {
    const cursors: CursorParam = {};
    const columns = atob(cursor).split(',');
    columns.forEach((column) => {
      const [key, raw] = column.split(':');
      const type = this.getEntityPropertyType(key);
      const value = decodeByType(type, raw);
      cursors[key] = value;
    });

    return cursors;
  }

  private getEntityPropertyType(key: string): string {
    return Reflect.getMetadata(
      'design:type',
      this.entity.prototype,
      key,
    ).name.toLowerCase();
  }

  private flipOrder(order: Order): Order {
    return order === Order.ASC ? Order.DESC : Order.ASC;
  }

  private toPagingResult<Entity>(entities: Entity[]): PagingResult<Entity> {
    return {
      data: entities,
      cursor: this.getCursor(),
    };
  }
}

export interface PagingQuery {
  afterCursor?: string;
  beforeCursor?: string;
  limit?: number;
  order?: Order | 'ASC' | 'DESC';
}

export interface PaginationOptions<Entity> {
  entity: ObjectType<Entity>;
  alias?: string;
  query?: PagingQuery;
  paginationKeys?: Extract<keyof Entity, string>[];
}

export type EscapeFn = (name: string) => string;

export interface CursorParam {
  [key: string]: any;
}

export interface Cursor {
  beforeCursor: string | null;
  afterCursor: string | null;
}

export interface PagingResult<Entity> {
  data: Entity[];
  cursor: Cursor;
}

export enum Order {
  ASC = 'ASC',
  DESC = 'DESC',
}

export type OrderByCondition = {
  [columnName: string]:
    | ('ASC' | 'DESC')
    | {
        order: 'ASC' | 'DESC';
        nulls?: 'NULLS FIRST' | 'NULLS LAST';
      };
};

function atob(value: string): string {
  return Buffer.from(value, 'base64').toString();
}

function btoa(value: string): string {
  return Buffer.from(value).toString('base64');
}

function encodeByType(type: string, value: any): string | null {
  if (value === null) return null;

  switch (type) {
    case 'date': {
      return (value as Date).getTime().toString();
    }
    case 'number': {
      return `${value}`;
    }
    case 'string': {
      return encodeURIComponent(value);
    }
    case 'object': {
      /**
       * if reflection type is Object, check whether an object is a date.
       * see: https://github.com/rbuckton/reflect-metadata/issues/84
       */
      if (typeof value.getTime === 'function') {
        return (value as Date).getTime().toString();
      }

      /**
       * Support for branded id's having the following structure
       *
       * interface Uuid extends String {
       *     _uuidBrand: string;
       * }
       *
       * or
       *
       * declare const __brand: unique symbol;
       * type Brand<B> = { [__brand]: B };
       * type Branded<T, B> = T & Brand<B>;
       * type Uuid = Branded<string, 'Uuid'>;
       *
       * the above interface or type will support toString() method
       */
      if (typeof value.toString === 'function') {
        return value.toString();
      }

      break;
    }
    default:
      break;
  }

  throw new Error(`unknown type in cursor: [${type}]${value}`);
}

function decodeByType(type: string, value: string): string | number | Date {
  switch (type) {
    case 'object': {
      /**
       * Support for branded id's having the following structure
       *
       * interface Uuid extends String {
       *     _uuidBrand: string;
       * }
       *
       * or
       *
       * declare const __brand: unique symbol;
       * type Brand<B> = { [__brand]: B };
       * type Branded<T, B> = T & Brand<B>;
       * type Uuid = Branded<string, 'Uuid'>;
       *
       * the above interface or type will support toString() method
       */
      if (typeof value.toString === 'function') {
        return value.toString();
      }

      break;
    }
    case 'date': {
      const timestamp = parseInt(value, 10);

      if (Number.isNaN(timestamp)) {
        throw new Error('date column in cursor should be a valid timestamp');
      }

      return new Date(timestamp);
    }

    case 'number': {
      const num = parseFloat(value);

      if (Number.isNaN(num)) {
        throw new Error('number column in cursor should be a valid number');
      }

      return num;
    }

    case 'string': {
      return decodeURIComponent(value);
    }

    default: {
      throw new Error(`unknown type in cursor: [${type}]${value}`);
    }
  }
}

function pascalToUnderscore(str: string): string {
  return camelOrPascalToUnderscore(str);
}

function camelOrPascalToUnderscore(str: string): string {
  return str
    .split(/(?=[A-Z])/)
    .join('_')
    .toLowerCase();
}
