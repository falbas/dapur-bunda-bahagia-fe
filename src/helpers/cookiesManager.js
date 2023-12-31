import Cookies from 'js-cookie'

export const setCookies = (key, value) => {
  Cookies.set(key, value, { expires: process.env.COOKIE_EXPIRES || 1 })
}

export const getCookies = (key) => {
  return Cookies.get(key)
}

export const removeCookies = (key) => {
  Cookies.remove(key)
}
