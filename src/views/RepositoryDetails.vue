<template>
  <div class="repository-details">
    <template v-if="!notFound && repository">
      <div class="header">
        <h2>{{repository.name}}</h2>

        <div class="buttons">
          <button
            class="delete-button"
            @click="handleDelete"
          >{{"repository-details.delete-button" | translate}}</button>

          <router-link to="/" tag="button" class="back-button">{{"common.back" | translate}}</router-link>
        </div>
      </div>

      <h3>{{"repository-details.contributors-title" | translate}}</h3>

      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>{{"repository-details.contributors-table.username-column" | translate}}</th>
              <th>{{"repository-details.contributors-table.profile-link-column" | translate}}</th>
              <th>{{"repository-details.contributors-table.commits-column" | translate}}</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="contributor of contributors" :key="contributor.login">
              <td>
                {{contributor.login}}
                <span
                  v-if="contributor.login === repository.owner.login"
                  class="owner-label"
                >({{"repository-details.contributors-table.owner-label" | translate}})</span>
              </td>

              <td>
                <a :href="contributor.html_url" target="_blank">{{contributor.html_url}}</a>
              </td>

              <td>{{contributor.contributions}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </template>
    <div class="not-found" v-else>
      <h3>404 - {{ "repository-details.not-found" | translate }}</h3>
      <router-link to="/" tag="button" class="back-button">{{"common.back" | translate}}</router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { mapGetters, mapActions } from "vuex";
import * as GitHub from "@/models/github";
import { Dictionary } from "lodash";
import repositoryService from "@/services/repository.service";

@Component({
  computed: mapGetters(["repositoryMap"]),
  methods: mapActions(["removeRepository"])
})
export default class RepositoryDetails extends Vue {
  repositoryMap!: Dictionary<GitHub.Repository>;
  repository: GitHub.Repository | null = null;
  removeRepository!: (repoId: number) => void;
  contributors: GitHub.User[] = [];
  notFound = false;

  async mounted() {
    this.repository = this.repositoryMap[this.$route.params.id] || null;

    if (this.repository) {
      this.contributors = await repositoryService.getContributers(
        this.repository.contributors_url
      );
    } else {
      this.notFound = true;
    }
  }

  handleDelete() {
    this.$router.push("/");
    this.removeRepository(this.repository!.id);
  }
}
</script>

<style scoped lang="scss">
@import "@/styles/mixins";

.repository-details {
  max-width: 1000px;
  margin: 0 auto;
  padding-top: 8px;
}

.header {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  h2 {
    @include large-phone {
      font-size: 1.2rem;
    }
  }

  @include small-phone {
    flex-flow: column nowrap;
  }
}

.buttons {
  display: flex;
  flex-flow: row nowrap;
}

.delete-button {
  @include button(true);
  margin-right: 8px;
}

.back-button {
  @include button;
}

.not-found {
  position: absolute;
  top: 20%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;

  button {
    display: inline;
  }
}

.table-container {
  width: 100%;
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
}

tr {
  &:nth-child(odd) {
    td {
      background: lighten(lightgray, 10%);
    }
  }
}

th,
td {
  padding: 8px;

  &:first-child {
    text-align: right;
  }

  &:nth-child(2) {
    text-align: left;
  }

  &:nth-child(3) {
    text-align: center;
  }
}
</style>