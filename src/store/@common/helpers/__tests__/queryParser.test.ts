import { getQueryParam } from '../queryParser';

describe('queryParser', () => {
  it('return null if not match', () => {
    expect(getQueryParam('?test=2', 'other')).toBeNull();
  });

  it('parse query', () => {
    expect(getQueryParam('?test=2', 'test')).toBe('2');
  });

  it('parse query more params', () => {
    expect(getQueryParam('?test=2&second=core', 'test')).toBe('2');
    expect(getQueryParam('?test=2&second=core', 'second')).toBe('core');
  });
});
