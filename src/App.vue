<template>
  <div id="app">
    <Header />

    <main>
      <router-view />
    </main>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Header from "@/components/Header.vue";

@Component({
  components: {
    Header
  }
})
export default class App extends Vue {}
</script>

<style lang="scss">
@import "@/styles/mixins";

* {
  outline: none;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;

  main {
    margin-top: 60px;

    @include large-phone {
      margin-top: 40px;
    }

    @include small-phone {
      margin-top: 40px;
    }
  }

  a {
    color: $primary;
  }
}
</style>
