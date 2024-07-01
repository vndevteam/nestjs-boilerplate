import { PageBasedPaginationDto } from '@/common/dto/page-based-pagination/pagination.dto';
import { PaginatedDto } from '@/common/dto/paginated.dto';
import { SYSTEM_USER_ID } from '@/constants/app.constant';
import { ErrorCode } from '@/constants/error-code.constant';
import { ValidationException } from '@/exceptions/validation.exception';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { FindOptionsOrder, Repository } from 'typeorm';
import { CreateUserReqDto } from './dto/create-user.req.dto';
import { ListUserReqDto } from './dto/list-user.req.dto';
import { UpdateUserReqDto } from './dto/update-user.req.dto';
import { UserResDto } from './dto/user.res.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {
  public readonly logger = new Logger(UserService.name);

  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}
  async create(dto: CreateUserReqDto): Promise<UserResDto> {
    const { username, email, password } = dto;

    // check uniqueness of username/email
    const user = await this.userRepository.findOne({
      where: [
        {
          username,
        },
        {
          email,
        },
      ],
    });

    if (user) {
      throw new ValidationException(ErrorCode.E001);
    }

    const newUser = new UserEntity({
      username,
      email,
      password,
      createdBy: SYSTEM_USER_ID,
      updatedBy: SYSTEM_USER_ID,
    });

    const savedUser = await this.userRepository.save(newUser);

    return plainToInstance(UserResDto, savedUser);
  }

  async findAll(reqDto: ListUserReqDto): Promise<PaginatedDto<UserResDto>> {
    let order: FindOptionsOrder<UserEntity> = { createdAt: 'DESC' };
    if (reqDto.orderBy && reqDto.order) {
      order = { [reqDto.orderBy]: reqDto.order, ...order };
    }
    const [users, count] = await this.userRepository.findAndCount({
      order,
      skip: reqDto.offset,
      take: reqDto.limit,
    });

    const pageDto = new PageBasedPaginationDto(count, reqDto);
    return new PaginatedDto(plainToInstance(UserResDto, users), pageDto);
  }

  async findOne(id: number): Promise<UserResDto> {
    const user = await this.userRepository.findOneByOrFail({ id });

    return user.toDto(UserResDto);
  }

  update(id: number, updateUserDto: UpdateUserReqDto) {
    console.log(updateUserDto);
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
