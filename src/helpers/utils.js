export const currencyFormat = (number) => {
  const formattedNumber = number
    .toFixed(0)
    .replace(/\B(?=(\d{3})+(?!\d))/g, '.')
  return `Rp${formattedNumber}`
}
