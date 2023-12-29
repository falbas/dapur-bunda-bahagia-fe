import Cookies from 'js-cookie'

export const addToCart = (item) => {
  const cartCookie = Cookies.get('cart')
  const cart = cartCookie ? JSON.parse(cartCookie) : []

  const existingItem = cart.findIndex((c) => c.id === item.id)

  if (existingItem !== -1) {
    cart[existingItem] = item
  } else {
    cart.push(item)
  }

  Cookies.set('cart', JSON.stringify(cart))
}

export const displayCart = () => {
  const cartCookie = Cookies.get('cart')
  const cart = cartCookie ? JSON.parse(cartCookie) : []

  return cart
}
