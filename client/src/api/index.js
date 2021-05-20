import axios from "axios"

export class Api {
  constructor() {
    this.Axios = axios.create({
      baseURL: Api.domainUrl(),
    })
  }

  static domainUrl() {
    if (process.env.NODE_ENV === 'production') return ''
    return 'http://localhost:5000'
  }

  get headers() {
    return {
      "Content-Type": "application/json",
      authorization: `Bearer ${this.token}`
    }
  }

  get token() {
    return localStorage.getItem("token") || "";
  }

  set token(_token) {
    localStorage.setItem('token', _token)
  }
}