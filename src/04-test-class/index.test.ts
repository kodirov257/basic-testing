import {
  BankAccount,
  getBankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
} from '.';
import { random } from 'lodash';

jest.mock('lodash', () => ({
  random: jest.fn(),
}));

describe('BankAccount', () => {
  afterAll(() => {
    jest.unmock('lodash');
  });

  test('should create account with initial balance', () => {
    const account: BankAccount = getBankAccount(1000);
    expect(account.getBalance()).toBe(1000);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect.assertions(2);

    const account: BankAccount = getBankAccount(1000);

    expect(account.getBalance()).toBe(1000);
    expect(() => account.withdraw(1001)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    expect.assertions(3);

    const account1: BankAccount = getBankAccount(1000);
    const account2: BankAccount = getBankAccount(100);

    expect(account1.getBalance()).toBe(1000);
    expect(account2.getBalance()).toBe(100);
    expect(() => account1.transfer(1001, account2)).toThrow(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring to the same account', () => {
    expect.assertions(2);

    const account1: BankAccount = getBankAccount(1000);

    expect(account1.getBalance()).toBe(1000);
    expect(() => account1.transfer(1001, account1)).toThrow(
      TransferFailedError,
    );
  });

  test('should deposit money', () => {
    const account1: BankAccount = getBankAccount(1000);

    expect(account1.getBalance()).toBe(1000);

    account1.deposit(500);

    expect(account1.getBalance()).toBe(1500);
  });

  test('should withdraw money', () => {
    const account1: BankAccount = getBankAccount(1000);

    expect(account1.getBalance()).toBe(1000);

    account1.withdraw(500);

    expect(account1.getBalance()).toBe(500);
  });

  test('should transfer money', () => {
    const account1: BankAccount = getBankAccount(1000);
    const account2: BankAccount = getBankAccount(100);

    expect(account1.getBalance()).toBe(1000);
    expect(account2.getBalance()).toBe(100);

    account1.transfer(500, account2);

    expect(account1.getBalance()).toBe(500);
    expect(account2.getBalance()).toBe(600);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const account: BankAccount = getBankAccount(1000);

    expect(account.getBalance()).toBe(1000);

    (random as jest.Mock)
      .mockImplementationOnce(() => 50)
      .mockImplementationOnce(() => 1);

    await expect(account.fetchBalance()).resolves.toBe(50);
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const account: BankAccount = getBankAccount(1000);

    expect(account.getBalance()).toBe(1000);

    (random as jest.Mock)
      .mockImplementationOnce(() => 50)
      .mockImplementationOnce(() => 1);

    await account.synchronizeBalance();

    expect(account.getBalance()).toBe(50);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    expect.assertions(2);
    const account: BankAccount = getBankAccount(1000);

    expect(account.getBalance()).toBe(1000);

    (random as jest.Mock)
      .mockImplementationOnce(() => 50)
      .mockImplementationOnce(() => 0);

    await expect(account.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});
