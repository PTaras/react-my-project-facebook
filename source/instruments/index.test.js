// Core
import { sum, delay, getUniqueID, getFullApiUrl } from './';

describe('instruments:', () => {
    // sum
    test('sum function should be a function', () => {
        expect(sum).toBeInstanceOf(Function);
    });
    
    test('sum function should thow, when called with non-number type as second argument', () => {
        expect(() => sum(2, 'hello')).toThrow();
    });

    test('sum function should thow, when called with non-number type as first argument', () => {
        expect(() => sum('hello', 2)).toThrow();
    });

    test('sum function should return an addition of two arguments passed', () => {
        expect(sum(2, 3)).toBe(5);
        expect(sum(1, 8)).toBe(9);
    });

    // delay
    test('delay function should return a resolved promise', async () => {
        await expect(delay()).resolves.toBeUndefined();
    });

    // getUniqueID
    test('getUniqueID function should be a function', () => {
        expect(getUniqueID).toBeInstanceOf(Function);
    });

    test('getUniqueID function should thow, when called with non-number type as first argument', () => {
        expect(() => getUniqueID('hello')).toThrow();
    });

    test('getUniqueID function should produce a string of a desired given length', () => {
        expect(typeof getUniqueID()).toBe('string');
        expect(getUniqueID(5)).toHaveLength(5);
        expect(getUniqueID(13)).toHaveLength(13);
    });

    // getFullApiUrl
    test('getFullApiUrl function should be a function', () => {
        expect(getFullApiUrl).toBeInstanceOf(Function);
    });

    test('getFullApiUrl function should produce a string', () => {
        expect(() => getFullApiUrl()).toThrow('string');
    });
});
