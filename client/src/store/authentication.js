import router from '../router';
import HTTP from '../http';

export default {
  namespaced: true,
  state: {
    registerEmail: '',
    registerPassword: '',
    registerError: null,
    loginPassword: '',
    loginError: null,
    loginEmail: 'chester',
    token: null,
  },
  actions: {
    logout({ commit }) {
      commit('setToken', null);
      router.push('/login');
    },
    register({ commit, state }) {
      commit('setRegisterError', null);
      return HTTP().post('api/auth/register', {
        email: state.registerEmail,
        password: state.registerPassword,
      })
        .then(({ data }) => {
          commit('setToken', data.token);
          router.push('/');
        })
        .catch(() => {
          commit('setRegisterError', 'Invalid Registration Information');
        });
    },
    login({ commit, state }) {
      commit('setLoginError', null);
      return HTTP().post('api/auth/login', {
        email: state.loginEmail,
        password: state.loginPassword,
      })
        .then(({ data }) => {
          commit('setToken', data.token);
          router.push('/');
        })
        .catch(() => {
          commit('setLoginError', 'Invalid Login Information');
        });
    },
  },
  getters: {
    isLoggedIn(state) {
      return !!state.token;
    },
  },
  mutations: {
    setRegisterEmail(state, email) {
      state.registerEmail = email;
    },
    setRegisterPassword(state, password) {
      state.registerPassword = password;
    },
    setRegisterError(state, error) {
      state.registerError = error;
    },
    setLoginEmail(state, email) {
      state.loginrEmail = email;
    },
    setLoginsword(state, password) {
      state.loginPassword = password;
    },
    setLoginError(state, error) {
      state.loginError = error;
    },
    setToken(state, token) {
      state.token = token;
    },
  },
};
