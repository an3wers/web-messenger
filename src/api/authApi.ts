import BaseAPI from './baseApi'
import { SigninData, SignupData } from './types/authTypes'

class AuthAPI extends BaseAPI {
  constructor() {
    super('/auth')
  }

  signup(data: SignupData) {
    return this.http.post('/signup', { data })
  }

  signin(data: SigninData) {
    return this.http.post('/signin', { data })
  }

  logout() {
    return this.http.post('/logout')
  }

  getUser() {
    return this.http.get('/user')
  }

  create = undefined
  read = undefined
  update = undefined
  delete = undefined
}

export default AuthAPI
