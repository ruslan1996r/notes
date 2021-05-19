import axios from "axios"

export class Api {
  constructor() {
    this.Axios = axios.create({
      baseURL: this.domainUrl,
      // headers: {
      // "Content-Type": "application/json",
      // authorization: `Bearer ${this.token}`
      // }
    })
  }

  get domainUrl() {
    if (process.env.NODE_ENV === 'production') {
      return ''
    }
    return 'https://jsonplaceholder.typicode.com' //'http://localhost:5000/'
  }

  get token() {
    return localStorage.getItem("token") || "";
  }
}