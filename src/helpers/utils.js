export const currencyFormat = (number) => {
  const formattedNumber = number
    .toFixed(0)
    .replace(/\B(?=(\d{3})+(?!\d))/g, '.')
  return `Rp${formattedNumber}`
}

export const dateFormat = (date) => {
  const timestamp = new Date(date)

  const monthsInIndonesian = [
    'Januari',
    'Februari',
    'Maret',
    'April',
    'Mei',
    'Juni',
    'Juli',
    'Agustus',
    'September',
    'Oktober',
    'November',
    'Desember',
  ]

  const day = timestamp.getDate()
  const month = monthsInIndonesian[timestamp.getMonth()]
  const year = timestamp.getFullYear()
  const hour = String(timestamp.getHours()).padStart(2, '0')
  const minute = String(timestamp.getMinutes()).padStart(2, '0')

  const formattedDate = `${day} ${month} ${year}, ${hour}:${minute}`

  return formattedDate
}
