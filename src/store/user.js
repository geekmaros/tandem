const user = {
  namespaced: true,
  state: {
    currentPlayer: null
  },
  mutations: {
    SETUSERNAME(state, payload) {
      state.currentPlayer = payload;
    }
  },
  actions: {
    setUserName({ commit }, payload) {
      commit("SETUSERNAME", payload);
    }
  },
  getters: {
    getPlayer: state => state.currentPlayer
  }
};

export default user;
