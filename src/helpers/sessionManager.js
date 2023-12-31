import { setCookies, getCookies } from './cookiesManager'
import { v4 as uuidv4 } from 'uuid'

export const setSession = () => {
  const sessionCookie = getCookies('session')

  if (sessionCookie) {
    setCookies('session', sessionCookie)
  } else {
    setCookies('session', uuidv4())
  }
}

export const getSession = () => {
  return getCookies('session')
}
