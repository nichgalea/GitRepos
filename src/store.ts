import Vue from "vue";
import Vuex from "vuex";
import VuexPersist from "vuex-persist";

Vue.use(Vuex);

interface State {
  lang: string;
}

const vuexLocal = new VuexPersist<State>();

export default new Vuex.Store<State>({
  state: {
    lang: "en"
  },
  mutations: {
    setLanguage(state, lang: string) {
      state.lang = lang;
    }
  },
  actions: {
    setLanguage({ commit }, lang: string) {
      commit("setLanguage", lang);
    }
  },
  plugins: [vuexLocal.plugin]
});
