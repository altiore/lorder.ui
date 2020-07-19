export default function(enumType) {
  const keys = Object.keys(enumType);
  return enumType[keys[Math.floor(Math.random() * Math.floor(keys.length))]];
}
