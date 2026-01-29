import { Post, PostsService } from './posts.service';

describe('PostsService', () => {
  let postsService: PostsService;
  const post: Omit<Post, 'id' | 'date'> = {
    text: 'Mocked post',
  };

  beforeEach(async () => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2020-01-01T00:00:00.000Z'));

    postsService = new PostsService();

    postsService.create({ text: 'Some pre-existing post' });
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should add a new post', () => {
    const createdPost = postsService.create(post);

    expect(createdPost).toEqual({
      id: '2',
      text: 'Mocked post',
      date: '2020-01-01T00:00:00.000Z',
    });

    expect(postsService.find(createdPost.id)).toEqual(createdPost);
  });

  it('should find a post', () => {
    expect(postsService.find('1')).toEqual({
      id: '1',
      text: 'Some pre-existing post',
      date: '2020-01-01T00:00:00.000Z',
    });
  });
});
