import { setCookies, getCookies, removeCookies } from './cookiesManager'

export const addToCart = (item) => {
  const cartCookie = getCookies('cart')
  const cart = cartCookie ? JSON.parse(cartCookie) : []

  const existingItem = cart.findIndex((c) => c.id === item.id)

  if (existingItem !== -1) {
    cart[existingItem] = item
  } else {
    cart.push(item)
  }

  setCookies('cart', JSON.stringify(cart))
}

export const displayCart = () => {
  const cartCookie = getCookies('cart')
  const cart = cartCookie ? JSON.parse(cartCookie) : []

  return cart
}

export const clearCart = () => {
  removeCookies('cart')
}

export const deleteItem = (id) => {
  const cartCookie = getCookies('cart')
  const cart = cartCookie ? JSON.parse(cartCookie) : []

  const existingItem = cart.findIndex((c) => c.id === id)

  if (existingItem !== -1) {
    cart.splice(existingItem, 1)
  }

  setCookies('cart', JSON.stringify(cart))
}
