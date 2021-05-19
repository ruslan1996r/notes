import { Api } from "./index";

class AuthApi extends Api {
  constructor() {
    super()
  }

  test() {
    this.Axios.get('/todos/1')
      .then(res => console.log("res", res.data))
  }

  login() {
    return
  }

  register() {
    return
  }
}

export default new AuthApi