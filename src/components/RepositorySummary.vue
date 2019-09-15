<template>
  <table>
    <tbody>
      <tr>
        <th>{{"repository-summary.name" | translate}}</th>
        <td>{{repository.name}}</td>
      </tr>
      <tr>
        <th>{{"repository-summary.owner" | translate}}</th>
        <td>{{repository.owner.login}}</td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import * as GitHub from "@/models/github";

@Component
export default class RepositorySummary extends Vue {
  @Prop() repository!: GitHub.Repository;
}
</script>

<style scoped lang="scss">
th {
  text-align: right;
  font-weight: normal;
}

td {
  font-weight: bold;
  padding-left: 8px;
}
</style>