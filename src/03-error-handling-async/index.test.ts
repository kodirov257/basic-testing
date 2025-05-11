// Uncomment the code below and write your tests
import {
  throwError,
  throwCustomError,
  resolveValue,
  MyAwesomeError,
  rejectCustomError,
} from './index';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    const value = { value: 'resolved-value' };
    expect(await resolveValue(value)).toEqual(value);
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    const message = 'Exception message';
    expect(() => throwError(message)).toThrow('Exception message');
  });

  test('should throw error with default message if message is not provided', () => {
    expect(() => throwError()).toThrow(/^Oops!$/);
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    expect(() => throwCustomError()).toThrow(MyAwesomeError);
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    expect.assertions(1);
    await expect(() => rejectCustomError()).rejects.toThrow(MyAwesomeError);
  });
});
