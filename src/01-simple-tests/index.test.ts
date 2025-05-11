// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const result = simpleCalculator({ a: 1, b: 2, action: Action.Add });
    expect(result).toBe(3);
  });

  test('should subtract two numbers', () => {
    const result = simpleCalculator({ a: 10, b: 4, action: Action.Subtract });
    expect(result).toBe(6);
  });

  test('should multiply two numbers', () => {
    const result = simpleCalculator({ a: 12, b: 5, action: Action.Multiply });
    expect(result).toBe(60);
  });

  test('should divide two numbers', () => {
    const result = simpleCalculator({ a: 75, b: 15, action: Action.Divide });
    expect(result).toBe(5);
  });

  test('should exponentiate two numbers', () => {
    const result = simpleCalculator({
      a: 4,
      b: 5,
      action: Action.Exponentiate,
    });
    expect(result).toBe(1024);
  });

  test('should return null for invalid action', () => {
    const result = simpleCalculator({ a: 4, b: 5, action: 'invalid-action' });
    expect(result).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    const result = simpleCalculator({
      a: 'invalid-argument',
      b: 5,
      action: 'invalid-action',
    });
    expect(result).toBeNull();
  });
});
