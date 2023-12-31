import axios from 'axios'
import { getToken } from './tokenManager'

const fetcherInstance = () => {
  const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BE_URL,
  })

  const token = getToken()
  if (token) {
    instance.defaults.headers.common['Authorization'] = 'Bearer ' + token
  }

  return instance
}

export const fetcher = fetcherInstance()

export const fetcherSWR = (url) => fetcher.get(url).then((res) => res.data)
