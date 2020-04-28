import toString from 'lodash/toString';

enum PLURAL_TYPE {
  ZERO = 0,
  ONE = 1,
  PARE = 2,
  MANY = 5,
}

export function pluralRu(
  count: number,
  zeroString: string,
  oneString: string,
  pareString: string,
  manyString: string
): string {
  switch (plural(count)) {
    case PLURAL_TYPE.ZERO:
      return parse(zeroString, count);
    case PLURAL_TYPE.ONE:
      return parse(oneString, count);
    case PLURAL_TYPE.PARE:
      return parse(pareString, count);
    case PLURAL_TYPE.MANY:
      return parse(manyString, count);
    default:
      return parse(manyString, count);
  }
}

function parse(str: string, count: number) {
  return str.replace(/%d/g, toString(count));
}

function plural(a) {
  if (!a) {
    return PLURAL_TYPE.ZERO;
  }
  if (a % 10 === 1 && a % 100 !== 11) {
    return PLURAL_TYPE.ONE;
  } else if (a % 10 >= 2 && a % 10 <= 4 && (a % 100 < 10 || a % 100 >= 20)) {
    return PLURAL_TYPE.PARE;
  } else {
    return PLURAL_TYPE.MANY;
  }
}
