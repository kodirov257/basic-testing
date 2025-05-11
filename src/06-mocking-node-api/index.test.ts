import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';

// import { readFile } from 'node:fs/promises';
import { existsSync } from 'fs';
import { join } from 'path';
import { readFile } from 'fs/promises';

jest.mock('fs/promises', () => ({
  readFile: jest.fn(),
}));
jest.mock('fs', () => ({
  existsSync: jest.fn(),
}));
jest.mock('path', () => ({
  join: jest.fn(),
}));

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    jest.spyOn(global, 'setTimeout');
    const callback = jest.fn();

    doStuffByTimeout(callback, 100);

    expect(setTimeout).toHaveBeenLastCalledWith(callback, 100);
  });

  test('should call callback only after timeout', () => {
    jest.spyOn(global, 'setTimeout');
    const callback = jest.fn();

    expect(callback).not.toHaveBeenCalled();

    doStuffByTimeout(callback, 1000);

    jest.advanceTimersByTime(800);
    expect(callback).not.toHaveBeenCalled();

    jest.advanceTimersByTime(200);
    expect(callback).toHaveBeenCalled();

    expect(setTimeout).toHaveBeenCalled();
    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenLastCalledWith(callback, 1000);
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    jest.spyOn(global, 'setInterval');
    const callback = jest.fn();

    doStuffByInterval(callback, 100);

    expect(setInterval).toHaveBeenCalledWith(callback, 100);
  });

  test('should call callback multiple times after multiple intervals', () => {
    jest.spyOn(global, 'setInterval');
    const callback = jest.fn();

    doStuffByInterval(callback, 300);

    jest.advanceTimersByTime(1200);
    expect(callback).toHaveBeenCalledTimes(4);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    (join as jest.Mock).mockImplementation(() => 'path/to/file.txt');
    (existsSync as jest.Mock).mockReturnValue(false);

    await readFileAsynchronously('file.txt');

    expect(join).toHaveBeenCalledWith(__dirname, 'file.txt');
  });

  test('should return null if file does not exist', async () => {
    (join as jest.Mock).mockImplementation(() => 'path/to/file.txt');
    (existsSync as jest.Mock).mockReturnValue(false);

    const result = await readFileAsynchronously('file.txt');

    expect(result).toBeNull();
  });

  test('should return file content if file exists', async () => {
    (join as jest.Mock).mockImplementation(() => 'path/to/file.txt');
    (existsSync as jest.Mock).mockReturnValue(true);
    (readFile as jest.Mock).mockResolvedValue('file content');

    const result = await readFileAsynchronously('file.txt');

    expect(result).toBe('file content');
  });
});
