export const AuthService = {
  login: () => {
    sessionStorage.setItem("token", "yourAuthToken");
  },
  logout: () => {
    sessionStorage.removeItem("token");
  },
  isAuthenticated: () => {
    return sessionStorage.getItem("token") !== null;
  },
};
