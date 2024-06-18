import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { UserDto } from './dto/user.dto';
import { I18nContext } from 'nestjs-i18n';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}
  async create(dto: CreateUserDto): Promise<UserDto> {
    const i18n = I18nContext.current();

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
      throw new Error(i18n.t('validation.user.errors.userAlreadyExists'));
    }

    const newUser = new UserEntity({
      username,
      email,
      password,
      createdBy: 'system',
      updatedBy: 'system',
    });

    const savedUser = await this.userRepository.save(newUser);

    return plainToInstance(UserDto, savedUser);
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    console.log(updateUserDto);
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
