import Vue from "vue";
import Vuex from "vuex";
import VuexPersist from "vuex-persist";
import * as GitHub from "@/models/github";
import keyBy from "lodash/keyBy";

Vue.use(Vuex);

interface State {
  lang: string;
  repositories: GitHub.Repository[];
}

const vuexLocal = new VuexPersist<State>();

export default new Vuex.Store<State>({
  state: {
    lang: "en",
    repositories: []
  },
  mutations: {
    setLanguage(state, lang: string) {
      state.lang = lang;
    },
    addRepository(state, repository: GitHub.Repository) {
      state.repositories = [...state.repositories, repository];
    },
    removeRepository(state, repoId: number) {
      state.repositories = state.repositories.filter(r => r.id !== repoId);
    }
  },
  actions: {
    setLanguage({ commit }, lang: string) {
      commit("setLanguage", lang);
    },
    addRepository({ commit }, repository: GitHub.Repository) {
      commit("addRepository", repository);
    },
    removeRepository({ commit }, repoId) {
      commit("removeRepository", repoId);
    }
  },
  getters: {
    repositoryMap: state => keyBy(state.repositories, "id")
  },

  plugins: [vuexLocal.plugin]
});
