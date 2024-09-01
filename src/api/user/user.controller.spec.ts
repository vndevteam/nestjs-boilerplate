import { Uuid } from '@/common/types/common.type';
import { Test, TestingModule } from '@nestjs/testing';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { CreateUserReqDto } from './dto/create-user.req.dto';
import { UserResDto } from './dto/user.res.dto';
import { UserController } from './user.controller';
import { UserService } from './user.service';

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;
  let userServiceValue: Partial<Record<keyof UserService, jest.Mock>>;

  beforeAll(async () => {
    userServiceValue = {
      findOne: jest.fn(),
      create: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: userServiceValue,
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  // TODO: write unit tests for getCurrentUser method

  describe('createUser', () => {
    it('should return a user', async () => {
      const createUserReqDto = {
        username: 'john',
        email: 'mail@example.com',
        password: 'password',
        bio: 'bio',
        image: 'image',
      } as CreateUserReqDto;

      const userResDto = new UserResDto();
      userResDto.id = '1';
      userResDto.username = 'john';
      userResDto.email = 'mail@example.com';
      userResDto.bio = 'bio';
      userResDto.image = 'image';
      userResDto.posts = [];
      userResDto.createdAt = new Date();
      userResDto.updatedAt = new Date();

      userServiceValue.create.mockReturnValue(userResDto);
      const user = await controller.createUser(createUserReqDto);

      expect(user).toBe(userResDto);
      expect(userServiceValue.create).toHaveBeenCalledWith(createUserReqDto);
      expect(userServiceValue.create).toHaveBeenCalledTimes(1);
    });

    it('should return null', async () => {
      userServiceValue.create.mockReturnValue(null);
      const user = await controller.createUser({} as CreateUserReqDto);

      expect(user).toBeNull();
      expect(userServiceValue.create).toHaveBeenCalledWith({});
      expect(userServiceValue.create).toHaveBeenCalledTimes(1);
    });

    describe('CreateUserReqDto', () => {
      let createUserReqDto: CreateUserReqDto;

      beforeEach(() => {
        createUserReqDto = plainToInstance(CreateUserReqDto, {
          username: 'john',
          email: 'mail@example.com',
          password: 'password',
          bio: 'bio',
          image: 'image',
        });
      });

      it('should success with correctly data', async () => {
        const errors = await validate(createUserReqDto);
        expect(errors.length).toEqual(0);
      });

      it('should fail with empty username', async () => {
        createUserReqDto.username = '';
        const errors = await validate(createUserReqDto);
        expect(errors.length).toEqual(1);
        expect(errors[0].constraints).toEqual({
          minLength: 'username must be longer than or equal to 1 characters',
        });
      });

      it('should fail with empty email', async () => {
        createUserReqDto.email = '';
        const errors = await validate(createUserReqDto);
        expect(errors.length).toEqual(1);
        expect(errors[0].property).toBe('email');
      });

      it('should fail with invalid email', async () => {
        createUserReqDto.email = 'invalid-email';
        const errors = await validate(createUserReqDto);
        expect(errors.length).toEqual(1);
        expect(errors[0].constraints).toEqual({
          isEmail: 'email must be an email',
        });
      });

      it('should fail with empty password', async () => {
        createUserReqDto.password = '';
        const errors = await validate(createUserReqDto);
        expect(errors.length).toEqual(1);
        expect(errors[0].constraints).toEqual({
          minLength: 'password must be longer than or equal to 6 characters',
        });
      });

      it('should fail with invalid password', async () => {
        createUserReqDto.password = 'invalid-password';
        const errors = await validate(createUserReqDto);
        expect(errors.length).toEqual(1);
        expect(errors[0].constraints).toEqual({
          isPassword: 'password is invalid',
        });
      });

      it('should fail with empty bio', async () => {
        createUserReqDto.bio = '';
        const errors = await validate(createUserReqDto);
        expect(errors.length).toEqual(1);
        expect(errors[0].constraints).toEqual({
          minLength: 'bio must be longer than or equal to 1 characters',
        });
      });

      it('should success with bio is null', async () => {
        createUserReqDto.bio = null;
        const errors = await validate(createUserReqDto);
        expect(errors.length).toEqual(0);
      });

      it('should success with bio is undefined', async () => {
        createUserReqDto.bio = undefined;
        const errors = await validate(createUserReqDto);
        expect(errors.length).toEqual(0);
      });

      it('should fail with empty image', async () => {
        createUserReqDto.image = '';
        const errors = await validate(createUserReqDto);
        expect(errors.length).toEqual(1);
        expect(errors[0].constraints).toEqual({
          minLength: 'image must be longer than or equal to 1 characters',
        });
      });

      it('should success with image is null', async () => {
        createUserReqDto.image = null;
        const errors = await validate(createUserReqDto);
        expect(errors.length).toEqual(0);
      });

      it('should success with image is undefined', async () => {
        createUserReqDto.image = undefined;
        const errors = await validate(createUserReqDto);
        expect(errors.length).toEqual(0);
      });
    });
  });

  // TODO: write unit tests for findAllUsers method
  // TODO: write unit tests for loadMoreUsers method

  describe('findUser', () => {
    it('should return a user', async () => {
      const userResDto = new UserResDto();
      userResDto.id = '1';
      userResDto.username = 'john';
      userResDto.email = 'mail@example.com';
      userResDto.bio = 'bio';
      userResDto.image = 'image';
      userResDto.posts = [];
      userResDto.createdAt = new Date();
      userResDto.updatedAt = new Date();

      userServiceValue.findOne.mockReturnValue(userResDto);
      const user = await controller.findUser('1' as Uuid);

      expect(user).toBe(userResDto);
      expect(userServiceValue.findOne).toHaveBeenCalledWith('1');
      expect(userServiceValue.findOne).toHaveBeenCalledTimes(1);
    });

    it('should return null', async () => {
      userServiceValue.findOne.mockReturnValue(null);
      const user = await controller.findUser('1' as Uuid);

      expect(user).toBeNull();
      expect(userServiceValue.findOne).toHaveBeenCalledWith('1');
      expect(userServiceValue.findOne).toHaveBeenCalledTimes(1);
    });
  });

  // TODO: write unit tests for updateUser method
  // TODO: write unit tests for removeUser method
  // TODO: write unit tests for changePassword method
});
