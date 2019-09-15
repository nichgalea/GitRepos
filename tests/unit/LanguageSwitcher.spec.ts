import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex, { Store } from "vuex";
import LanguageSwitcher from "@/components/LanguageSwitcher.vue";

const localVue = createLocalVue();
localVue.use(Vuex);

jest.mock("@/i18n.json", () => ({ en: { "language-name": "English" }, mt: { "language-name": "Maltese" } }));

describe("LanguageSwitcher.vue", () => {
  let actions: any;
  let store: Store<any>;
  const state = { lang: "en" };

  beforeEach(() => {
    actions = {
      setLanguage: jest.fn()
    };

    store = new Vuex.Store<any>({
      actions,
      state
    });
  });

  it("Should render showing the language from the store state", () => {
    const wrapper = shallowMount(LanguageSwitcher, { store, localVue });
    const currentLanguage = wrapper.find(".current");
    expect(currentLanguage.text()).toBe("English");
  });

  it("Should render the list of languages (excluding current) when clicked", done => {
    const wrapper = shallowMount(LanguageSwitcher, { store, localVue });
    wrapper.find(".current").trigger("click");
    wrapper.vm.$nextTick(() => {
      const languageList = wrapper.find(".lang-list").element;
      expect(languageList.children.length).toBe(1);
      expect(languageList.children[0].textContent).toBe("Maltese");
      done();
    });
  });

  it("Should trigger action when a language from the list is clicked", done => {
    const wrapper = shallowMount(LanguageSwitcher, { store, localVue });
    wrapper.find(".current").trigger("click");
    wrapper.vm.$nextTick(() => {
      wrapper
        .find(".lang-list")
        .find("li")
        .trigger("click");

      expect(actions.setLanguage).toHaveBeenCalled();
      done();
    });
  });
});
