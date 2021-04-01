export function CurrencyFormat(num: number) {
  return 'Rp.' + num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}

export function LimitText(text: string, limit: number) {
  let _text = text;
  if (text.length > limit) {
    _text = `${text.substring(0, limit-2)}...`;
  }

  return _text;
}
