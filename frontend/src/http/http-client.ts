import { env } from '@config/env'
import axios from 'axios'

export const httpClient = axios.create({
  baseURL: env.VITE_API_URL,
})
