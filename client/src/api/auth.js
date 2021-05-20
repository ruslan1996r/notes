import { Api } from "./index";

class AuthApi extends Api {
  constructor() {
    super()
  }

  login = async (user) => {
    const result = await this.Axios.post('/user/login', user)
    if (result.data.token) this.token = result.data.token

    return {
      data: result.data,
      status: result.status
    }
  }

  register = async (user) => {
    const result = await this.Axios.post('/user/register', user)
    if (result.data.token) this.token = result.data.token

    return {
      data: result.data,
      status: result.status
    }
  }

  getMe = async () => {
    const result = await this.Axios.get('/user', { headers: this.headers })
    if (result.data.token) this.token = result.data.token
    return {
      data: result.data,
      status: result.status
    }
  }

  logout = () => {
    this.token = ''
  }
}

export default new AuthApi