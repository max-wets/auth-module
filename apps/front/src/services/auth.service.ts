import axios from 'axios';
import { IUser } from './interfaces/user.interface';
import { IUserLogin } from './interfaces/userLogin.interface';
import { IUserRegister } from './interfaces/userRegister.interface';

const API_URL = `${process.env.VUE_APP_URL}${process.env.VUE_APP_API}/authentication/`;

class AuthService {
  async login(user: IUserLogin) {
    try {
      const { data } = await axios.post<IUser>(API_URL + 'log-in', user);
      return data;
    } catch (err: any) {
      throw new Error(`login: ${err.message}`);
    }
  }

  async logout() {
    try {
      const { data } = await axios.post(API_URL + 'log-out');
      return data;
    } catch (err: any) {
      throw new Error(`logout: ${err.message}`);
    }
  }

  async register(user: IUserRegister) {
    try {
      const { data } = await axios.post<IUser>(API_URL + 'register', user);
      return data;
    } catch (err: any) {
      throw new Error(`register: ${err.message}`);
    }
  }

  async getUser() {
    try {
      const { data } = await axios.get<IUser>(API_URL + 'register');
      return data;
    } catch (err: any) {
      throw new Error(`get-user: ${err.message}`);
    }
  }
}

export default new AuthService();
