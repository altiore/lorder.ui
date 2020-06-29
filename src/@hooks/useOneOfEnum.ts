import { useMemo, useState } from 'react';

/**
 * Usage:
 * import { useOneOfEnum } from '.../useOneOfEnum';
 *
 * enum MyEnum {
 *   FIRST,
 *   SECOND,
 *   THIRD,
 * }
 *
 * const MyComponent = () => {
 *   const [curValue, setCurValue] = useOneOfEnum(MyEnum);
 * }
 *
 * @param enumObj
 * @param defaultValue
 */
export const useOneOfEnum = <EnumType>(enumObj: { [key in string]: EnumType }, defaultValue?: EnumType) => {
  const allowedKeys = useMemo(() => Object.keys(enumObj).filter(el => typeof enumObj[el] === 'number'), [enumObj]);

  const initial = useMemo(() => {
    if (typeof defaultValue !== 'undefined') {
      if (!Object.values(enumObj).includes(defaultValue)) {
        throw new Error('useOneOfEnum: wrong type of defaultValue');
      }
      return defaultValue;
    }
    if (typeof enumObj[allowedKeys[0]] !== 'undefined') {
      return enumObj[allowedKeys[0]];
    }

    return enumObj[Object.keys(enumObj)[0]];
  }, [allowedKeys, defaultValue, enumObj]);

  const [current, setCurrent] = useState(initial);

  return [current, setCurrent];
};
