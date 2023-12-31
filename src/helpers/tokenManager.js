import { setCookies, getCookies, removeCookies } from './cookiesManager'

export const setToken = (token) => {
  setCookies('token', token)
}

export const getToken = () => {
  return getCookies('token')
}

export const clearToken = () => {
  removeCookies('token')
}
