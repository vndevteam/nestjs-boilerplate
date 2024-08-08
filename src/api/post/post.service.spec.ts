import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { CreatePostReqDto } from './dto/create-post.req.dto';
import { PostEntity } from './entities/post.entity';
import { PostService } from './post.service';

jest.mock('uuid', () => ({
  v4: jest.fn(),
}));

describe('PostService', () => {
  let service: PostService;
  let repository: Repository<PostEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostService,
        {
          provide: getRepositoryToken(PostEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<PostService>(PostService);
    repository = module.get<Repository<PostEntity>>(
      getRepositoryToken(PostEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a post', async () => {
      const createPostDto: CreatePostReqDto = {
        title: 'Test Post',
        content: 'Sometimes, something beautiful happens in this world',
        slug: 'test-post',
      };
      const uuid = '61aba433-06ba-4264-8ddd-feaa95d6f7c7';
      (uuidv4 as jest.Mock).mockReturnValue(uuid);
      const savedPost = { id: uuid, ...createPostDto };

      jest.spyOn(repository, 'create').mockReturnValue(savedPost as any);
      jest.spyOn(repository, 'save').mockResolvedValue(savedPost as any);

      const result = await service.create(createPostDto);

      expect(repository.save).toHaveBeenCalledWith(
        new PostEntity(createPostDto),
      );
      expect(result).toEqual(savedPost);
      console.log(result);
      console.log(savedPost);
    });
  });
});
