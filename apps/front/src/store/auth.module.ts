import { DefineStoreOptions } from 'pinia';
import AuthService from '../services/auth.service';
import { IUser } from '../services/interfaces/user.interface';
import { IUserLogin } from '../services/interfaces/userLogin.interface';
import { IUserRegister } from '../services/interfaces/userRegister.interface';

export const auth: Partial<DefineStoreOptions<any, any, any, any>> = {
  state: () => {
    return { status: { loggedIn: false }, user: null as IUser | null };
  },
  actions: {
    async login(user: IUserLogin) {
      try {
        const userInfo = await AuthService.login(user);
        this.status.loggedIn = true;
        this.user = userInfo;
      } catch (err: any) {
        this.status.loggedIn = false;
        this.user = null;
        throw new Error(err);
      }
    },
    async logout() {
      try {
        await AuthService.logout();
        this.status.loggedIn = false;
        this.user = null;
      } catch (err: any) {
        throw new Error(err);
      }
    },
    async register(user: IUserRegister) {
      try {
        await AuthService.register(user);
        this.status.loggedIn = false;
      } catch (err: any) {
        this.status.loggedIn = false;
        throw new Error(err);
      }
    },
  },
};
