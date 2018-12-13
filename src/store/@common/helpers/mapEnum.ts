export function mapEnum<EnumType>(enumerable: EnumType, fn: (el: any) => any): any[] {
  // get all the members of the enum
  const enumMembers: any[] = Object.keys(enumerable).map(key => enumerable[key]);

  // we are only interested in the numeric identifiers as these represent the values
  const enumValues: number[] = enumMembers.filter(v => typeof v === 'number');

  // now map through the enum values
  return enumValues.map(m => fn(m));
}
