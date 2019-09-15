<template>
  <div @click.stop class="add-repository">
    <h2>{{ "add-repository.title" | translate }}</h2>

    <div class="inputs">
      <form @submit.prevent="submit" novalidate>
        <input
          type="url"
          v-model="repoUrl"
          placeholder="e.g. https://github.com/john-doe/cool-project"
        />

        <p v-if="loading" class="loading">{{"common.loading" | translate}}</p>
        <p v-if="error" class="error">{{error | translate}}</p>

        <div v-if="repository" class="summary">
          <RepositorySummary :repository="repository" />
        </div>

        <div class="buttons">
          <button
            class="cancel"
            @click="$emit('close')"
            type="button"
          >{{ "common.cancel" | translate }}</button>

          <button
            :disabled="!repository"
            class="submit"
            type="submit"
          >{{ "common.save" | translate }}</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import { mapGetters } from "vuex";
import debounce from "lodash/debounce";
import { Dictionary } from "lodash";
import * as GitHub from "@/models/github";
import repositoryService from "@/services/repository.service";
import RepositorySummary from "./RepositorySummary.vue";

@Component({
  components: {
    RepositorySummary
  },
  computed: mapGetters(["repositoryMap"])
})
export default class AddRepository extends Vue {
  loading = false;
  error = "";
  repoUrl = "";
  repository: GitHub.Repository | null = null;
  repositoryMap!: Dictionary<GitHub.Repository>;
  debouncedGetGitHubRepo!: () => void;

  created() {
    this.debouncedGetGitHubRepo = debounce(this.getGitHubRepo, 1000);
  }

  mounted() {
    window.addEventListener("click", this.handleOutsideClick);
  }

  destroyed() {
    window.removeEventListener("click", this.handleOutsideClick);
  }

  handleOutsideClick() {
    this.$emit("close");
  }

  async getGitHubRepo() {
    this.error = "";
    const trimmedRepoUrl = this.repoUrl.trim();

    if (trimmedRepoUrl.length === 0) {
      this.repository = null;
      return;
    }

    try {
      this.loading = true;
      const url = new URL(trimmedRepoUrl);
      this.repository = await repositoryService.getRepository(url.toString());

      if (this.repository!.id in this.repositoryMap) {
        throw "exists";
      }

      this.loading = false;
    } catch (e) {
      if (e === "exists") {
        this.error = "add-repository.exists";
      } else if (e.name === "TypeError") {
        this.error = "add-repository.invalid-url";
      } else if (e.status === 404) {
        this.error = "add-repository.not-found";
      }

      this.repository = null;
      this.loading = false;
    }
  }

  @Watch("repoUrl")
  repoUrlChange() {
    this.debouncedGetGitHubRepo();
  }

  submit() {
    this.$emit("finish", this.repository);
  }
}
</script>

<style scoped lang="scss">
@import "@/styles/mixins";

.add-repository {
  position: absolute;
  z-index: 999;
  background: white;
  box-sizing: border-box;

  box-shadow: 0px 12px 18px 0px rgba(0, 0, 0, 0.5);
  padding: 16px;
  border-radius: 10px;
  width: 50%;
  top: 15%;
  left: 50%;
  transform-origin: top;
  transform: translateX(-50%);

  @include tablet {
    top: 10%;
    width: 90%;
  }

  @include large-phone {
    top: 10%;
    width: 90%;
  }

  h2 {
    text-align: center;
  }
}

.buttons {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-around;
  margin-top: 16px;

  @include large-phone {
    flex-flow: column nowrap;
  }
}

button {
  width: 120px;

  &.submit {
    @include button;

    @include large-phone {
      margin-top: 8px;
    }
  }

  &.cancel {
    @include button($outline: true);
  }
}

input {
  appearance: none;
  width: 400px;
  max-width: 100%;
  font-size: 14px;
  padding: 8px;
  box-sizing: border-box;
  margin: 0 auto 0 auto;
  border: 1px solid $primary;
  border-radius: 6px;
  display: block;

  &::placeholder {
    font-style: italic;
    opacity: 0.7;
  }

  @include large-phone {
    width: 100%;
  }
}

.error {
  font-size: 14px;
  font-weight: 500;
  color: crimson;
  text-align: center;
}

.loading {
  text-align: center;
  font-size: 16px;
}

.summary {
  margin-top: 8px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
}
</style>