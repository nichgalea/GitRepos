<template>
  <header>
    <h1>GitHub Repo Explorer</h1>
    <LanguageSwitcher />
  </header>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import LanguageSwitcher from "./LanguageSwitcher.vue";

@Component({
  components: {
    LanguageSwitcher
  }
})
export default class Header extends Vue {}
</script>

<style scoped lang="scss">
@import "@/styles/mixins";
@import "@/styles/colors";

header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 0 8px;
  background: $primary;
  color: white;

  @include large-phone {
    height: 40px;
  }

  @include small-phone {
    height: 40px;
  }

  h1 {
    margin: 0;

    @include large-phone {
      font-size: 1.4rem;
    }

    @include small-phone {
      font-size: 1.3rem;
    }
  }
}
</style>