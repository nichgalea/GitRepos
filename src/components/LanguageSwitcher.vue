<template>
  <div :class="{ 'language-switcher': true, open }">
    <div class="current" @click.stop="open = !open">{{i18n[lang]["language-name"]}}</div>

    <ul v-if="open" class="lang-list">
      <li
        v-for="l in languages"
        :key="l"
        @click="handleLanaguageClick(l)"
      >{{i18n[l]["language-name"]}}</li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import { mapActions, mapState } from "vuex";
import i18n from "@/i18n.json";

const languages = Object.keys(i18n);

@Component({
  computed: mapState(["lang"]),
  methods: mapActions(["setLanguage"])
})
export default class LanguageSwitcher extends Vue {
  i18n = i18n;
  open = false;
  lang!: string;
  setLanguage!: (language: string) => void;

  get languages() {
    return languages.filter(l => this.lang !== l);
  }

  handleLanaguageClick(language: string) {
    this.open = false;
    this.setLanguage(language);
  }

  @Watch("open")
  onOpenChange(newValue: boolean) {
    if (newValue) {
      window.addEventListener("click", this.handleOutSideClick);
    } else {
      window.removeEventListener("click", this.handleOutSideClick);
    }
  }

  handleOutSideClick() {
    this.open = false;
  }
}
</script>

<style scoped lang="scss">
@import "@/styles/colors";

.language-switcher {
  position: relative;
  cursor: pointer;
  user-select: none;
  width: 80px;
  text-align: right;
  padding-right: 8px;
  box-sizing: border-box;

  &.open {
    background: white;
    color: black;
    box-shadow: 1px 2px 5px 0px rgba(0, 0, 0, 0.5);
    border-bottom: 1px solid white;
  }
}

.current {
  margin: 8px 0;
}

.lang-list {
  position: absolute;
  list-style: none;
  margin: 0;
  padding: 0;
  right: 0;
  background: white;
  width: 80px;
  box-shadow: 1px 6px 5px 0px rgba(0, 0, 0, 0.56);

  li {
    padding: 8px 8px 8px 0;

    &:hover {
      background: lighten(lightgray, 10%);
    }
  }
}
</style>