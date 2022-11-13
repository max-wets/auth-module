import { defineStore } from 'pinia';
import { auth } from './auth.module';

export const useStore = defineStore('auth', auth);
