import { defineStore } from "pinia";

interface User {
  id: string;
  name: string;
  email: string;
  // add other fields as per your user model
  [key: string]: any;
}

interface SessionState {
  user: User | null;
  token: string | null;
  isLoggedIn: boolean;
  redirectPath: string | null;
}

export const useSessionStore = defineStore("session", {
  state: (): SessionState => ({
    user: null,
    token: null,
    isLoggedIn: false,
    redirectPath: null,
  }),

  getters: {
    getUser: (state): User | null => state.user,
    getToken: (state): string | null => state.token,
    isAuthenticated: (state): boolean => state.isLoggedIn,
    getRedirectPath: (state): string | null => state.redirectPath,
  },

  actions: {
    setSession(userData: User, token: string) {
      this.user = userData;
      this.token = token;
      this.isLoggedIn = true;
    },

    clearSession() {
      this.user = null;
      this.token = null;
      this.isLoggedIn = false;
      this.redirectPath = null;
    },

    logout() {
      this.clearSession();
    },

    setRedirect(path: string) {
      this.redirectPath = path;
    },

    clearRedirect() {
      this.redirectPath = null;
    },
  },

  persist: true,
});
