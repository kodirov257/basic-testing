import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  const elements1 = ['a', 'b', 'c', 'd', 'e'];
  const elements2 = [1, 2, 3];

  test('should generate linked list from values 1', () => {
    const result = generateLinkedList(elements1);

    expect(result).toStrictEqual({
      value: 'a',
      next: {
        value: 'b',
        next: {
          value: 'c',
          next: {
            value: 'd',
            next: {
              value: 'e',
              next: {
                value: null,
                next: null,
              },
            },
          },
        },
      },
    });
    expect(result).toMatchSnapshot();
  });

  test('should generate linked list from values 2', () => {
    const result = generateLinkedList(elements2);

    expect(result).toStrictEqual({
      value: 1,
      next: {
        value: 2,
        next: {
          value: 3,
          next: {
            value: null,
            next: null,
          },
        },
      },
    });

    expect(result).toMatchSnapshot();
  });
});
