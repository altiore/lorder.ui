import { renderHook } from '@testing-library/react-hooks';

import { useOneOfEnum } from './useOneOfEnum';

enum TEST_ENUM_1 {
  FIRST = 0,
  SECOND = 1,
  THIRD = 2,
}

enum TEST_ENUM_2 {
  STRING_FIRST = 'first',
  STRING_SECOND = 'second',
  STRING_THIRD = 'third',
}

enum TEST_ENUM_3 {
  STRING_FIRST,
  STRING_SECOND,
  STRING_THIRD,
}

describe('useOneOfEnum', () => {
  it('test initial numeric', () => {
    const { result } = renderHook(() => useOneOfEnum(TEST_ENUM_1));

    const [value, setValue] = result.current;
    expect(value).toBe(TEST_ENUM_1.FIRST);
    expect(typeof setValue).toEqual('function');
  });

  it('with default initial numeric', () => {
    const { result } = renderHook(() => useOneOfEnum(TEST_ENUM_1, TEST_ENUM_1.THIRD));

    const [value, setValue] = result.current;
    expect(value).toBe(TEST_ENUM_1.THIRD);
    expect(typeof setValue).toEqual('function');
  });

  it('test initial string', () => {
    const { result } = renderHook(() => useOneOfEnum(TEST_ENUM_2));

    const [value, setValue] = result.current;
    expect(value).toBe(TEST_ENUM_2.STRING_FIRST);
    expect(typeof setValue).toEqual('function');
  });

  it('with default initial string', () => {
    const { result } = renderHook(() => useOneOfEnum(TEST_ENUM_2, TEST_ENUM_2.STRING_SECOND));

    const [value, setValue] = result.current;
    expect(value).toBe(TEST_ENUM_2.STRING_SECOND);
    expect(typeof setValue).toEqual('function');
  });

  it('test initial empty', () => {
    const { result } = renderHook(() => useOneOfEnum(TEST_ENUM_3));

    const [value, setValue] = result.current;
    expect(value).toBe(TEST_ENUM_3.STRING_FIRST);
    expect(typeof setValue).toEqual('function');
  });

  it('with default initial empty', () => {
    const { result } = renderHook(() => useOneOfEnum(TEST_ENUM_3, TEST_ENUM_3.STRING_SECOND));

    const [value, setValue] = result.current;
    expect(value).toBe(TEST_ENUM_3.STRING_SECOND);
    expect(typeof setValue).toEqual('function');
  });

  it('wrong default', () => {
    expect(() => {
      const { result } = renderHook(() => useOneOfEnum(TEST_ENUM_3, 'string'));
      console.log(result.current);
    }).toThrow('useOneOfEnum: wrong type of defaultValue');
  });
});
