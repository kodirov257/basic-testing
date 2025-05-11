// Uncomment the code below and write your tests
import { mockOne, mockTwo, mockThree, unmockedFunction } from './index';

jest.mock('./index', () => {
  const originalModule =
    jest.requireActual<typeof import('./index')>('./index');

  return {
    ...originalModule,
    mockOne: () => {},
    mockTwo: () => {},
    mockThree: () => {},
  };
});

describe('partial mocking', () => {
  afterAll(() => {
    jest.unmock('./index');
  });

  test('mockOne, mockTwo, mockThree should not log into console', () => {
    const spy = jest.spyOn(global.console, 'log');

    mockOne();
    mockTwo();
    mockThree();

    expect(spy).not.toHaveBeenCalled();

    spy.mockRestore();
  });

  test('unmockedFunction should log into console', () => {
    const spy = jest.spyOn(global.console, 'log');

    unmockedFunction();

    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith('I am not mocked');

    spy.mockRestore();
  });
});
