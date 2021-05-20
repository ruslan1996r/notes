import { Api } from "./index";

class NoteApi extends Api {
  constructor() {
    super()
  }

  getAll = async () => {
    const result = await this.Axios.get('/note', { headers: this.headers })
    return result.data
  }
  getNote = async (id) => {
    const result = await this.Axios.get(`/note/${id}`, { headers: this.headers })
    return result.data
  }
  create = async (data) => {
    const result = await this.Axios.post('/note', data, { headers: this.headers })
    return {
      data: result.data,
      status: result.status
    }
  }
  update = async (id, data) => {
    const result = await this.Axios.put(`/note/${id}`, data, { headers: this.headers })
    return {
      data: result.data,
      status: result.status
    }
  }
  delete = async (id) => {
    const result = await this.Axios.delete(`/note/${id}`, { headers: this.headers })
    return result.data
  }
}

export default new NoteApi