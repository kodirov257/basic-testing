// Uncomment the code below and write your tests
import axios, { AxiosInstance } from 'axios';
import { THROTTLE_TIME, throttledGetDataFromApi } from './index';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('throttledGetDataFromApi', () => {
  const mockGet = jest.fn();

  beforeEach(() => {
    jest.useFakeTimers();
    jest.clearAllMocks();

    const mockAxiosInstance: Partial<AxiosInstance> = {
      get: mockGet,
    };
    mockedAxios.create.mockReturnValue(mockAxiosInstance as AxiosInstance);
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('should create instance with provided base url', async () => {
    mockGet.mockResolvedValueOnce({ data: 'data' });

    const throttle = throttledGetDataFromApi('/posts');

    jest.advanceTimersByTime(THROTTLE_TIME);
    await throttle;

    expect(mockedAxios.create).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    const data = {
      userId: 1,
      id: 5,
      title: 'nesciunt quas odio',
      body: 'repudiandae veniam quaerat sunt sed\nalias aut fugiat sit autem sed est\nvoluptatem omnis possimus esse voluptatibus quis\nest aut tenetur dolor neque',
    };
    mockGet.mockResolvedValueOnce({ data });

    const throttle = throttledGetDataFromApi(`/posts/${data.id}`);

    jest.advanceTimersByTime(THROTTLE_TIME);
    await throttle;

    expect(mockGet).toHaveBeenCalledWith(`/posts/${data.id}`);
  });

  test('should return response data', async () => {
    const data = {
      userId: 1,
      id: 5,
      title: 'nesciunt quas odio',
      body: 'repudiandae veniam quaerat sunt sed\nalias aut fugiat sit autem sed est\nvoluptatem omnis possimus esse voluptatibus quis\nest aut tenetur dolor neque',
    };
    mockGet.mockResolvedValueOnce({ data });

    const throttle = throttledGetDataFromApi(`/posts/${data.id}`);

    jest.advanceTimersByTime(THROTTLE_TIME);
    const result = await throttle;

    expect(mockGet).toHaveBeenCalledWith(`/posts/${data.id}`);
    expect(result).toEqual(data);
  });
});
