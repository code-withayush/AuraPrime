export function currencyFormat(n: number) {
  return '₹ ' + Number(n).toLocaleString('en-IN');
}
