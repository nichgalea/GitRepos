<template>
  <div class="dashboard">
    <AddRepository v-if="isAddRepoOpen" @close="isAddRepoOpen = false" @finish="handleFinish" />

    <button
      class="add-repo-btn"
      @click.stop="isAddRepoOpen = !isAddRepoOpen"
    >+ {{ "dashboard.add-repository" | translate }}</button>

    <div>
      <h2 class="saved-title">{{"dashboard.saved-title" | translate}}</h2>

      <ul class="repo-list">
        <li v-for="repo of repositories" :key="repo.id">{{repo.full_name}}</li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import AddRepository from "@/components/AddRepository.vue";
import { mapActions, mapState } from "vuex";
import * as GitHub from "@/models/github";

@Component({
  components: {
    AddRepository
  },
  computed: mapState(["repositories"]),
  methods: mapActions(["addRepository"])
})
export default class Dashboard extends Vue {
  isAddRepoOpen = false;
  addRepository!: (repository: GitHub.Repository) => void;

  handleFinish(repository: GitHub.Repository) {
    this.isAddRepoOpen = false;
    this.addRepository(repository);
  }
}
</script>

<style scoped lang="scss">
@import "@/styles/colors";
@import "@/styles/mixins";

.dashboard {
  padding-top: 16px;
}

.add-repo-btn {
  @include button;
  margin: 16px auto;
}

.repo-list {
  list-style: none;
  padding: 0;
  margin-top: 16px;

  li {
    text-align: center;
    padding: 8px 0;
    cursor: pointer;

    &:hover {
      background: lighten(lightgray, 10%);
    }

    &:not(:first-child) {
      margin-top: 8px;
    }
  }
}

.saved-title {
  margin-top: 32px;
  text-align: center;
}
</style>