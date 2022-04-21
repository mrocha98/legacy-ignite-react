import axios, { AxiosInstance } from 'axios'

export class HttpService {
  readonly api: AxiosInstance

  constructor(baseURL = '/api') {
    this.api = axios.create({ baseURL })
  }
}
