// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const testCases = [
  {
    name: 'should add two numbers',
    a: 1,
    b: 2,
    action: Action.Add,
    expected: 3,
  },
  {
    name: 'should subtract two numbers',
    a: 6,
    b: 2,
    action: Action.Subtract,
    expected: 4,
  },
  {
    name: 'should multiply two numbers',
    a: 3,
    b: 2,
    action: Action.Multiply,
    expected: 6,
  },
  {
    name: 'should divide two numbers',
    a: 75,
    b: 15,
    action: Action.Divide,
    expected: 5,
  },
  {
    name: 'should exponentiate two numbers',
    a: 4,
    b: 5,
    action: Action.Exponentiate,
    expected: 1024,
  },
  {
    name: 'should return null for invalid action',
    a: 3,
    b: 2,
    action: 'invalid-action',
    expected: null,
  },
  {
    name: 'should return null for invalid arguments',
    a: 'invalid-argument',
    b: 2,
    action: Action.Multiply,
    expected: null,
  },
];

describe('simpleCalculator', () => {
  testCases.forEach((testCase) => {
    test(testCase.name, () => {
      const result = simpleCalculator({
        a: testCase.a,
        b: testCase.b,
        action: testCase.action,
      });
      expect(result).toBe(testCase.expected);
    });
  });
});
