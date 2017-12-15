const PREFIXES = [
  { value: 10 ** 24, name: 'Y' },
  { value: 10 ** 21, name: 'Z' },
  { value: 10 ** 18, name: 'E' },
  { value: 10 ** 15, name: 'P' },
  { value: 10 ** 12, name: 'T' },
  { value: 10 ** 9, name: 'G' },
  { value: 10 ** 6, name: 'M' },
  { value: 10 ** 3, name: 'k' },
  { value: 10 ** 0, name: '' },
  { value: 10 ** -3, name: 'm' },
  { value: 10 ** -6, name: 'μ' },
  { value: 10 ** -9, name: 'n' },
  { value: 10 ** -12, name: 'p' },
  { value: 10 ** -15, name: 'f' },
  { value: 10 ** -18, name: 'a' },
  { value: 10 ** -21, name: 'z' },
  { value: 10 ** -24, name: 'y' },
];

/**
 * This function formats numbers, so it's easier to read them for user
 * for example, number 14250 will be formatted to 14.250 k
 * number 0.45 will be formatted to 450 m
 *
 * @param {Number} number
 *
 * @typedef {Object} FormattedNumber
 * @property {String} prefixName
 * @property {Number} formattedNumber
 *
 * @return {FormattedNumber}
 * */
export default function formatNumber(number) {
  let prefixName = null;
  let formattedNumber = null;
  for (let i = 0; i < PREFIXES.length; i += 1) {
    const { value, name } = PREFIXES[i];
    if (number >= value) {
      prefixName = name;
      formattedNumber = Math.round((number / value) * 1000) / 1000;
      break;
    }
  }

  return {
    prefixName,
    formattedNumber,
  };
}
