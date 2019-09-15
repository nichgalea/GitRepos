import * as GitHub from "@/models/github";
import httpService from "./http.service";

const GITHUB_API = "https://api.github.com";

export class RepositoryService {
  async getRepository(url: string): Promise<GitHub.Repository> {
    const repoUrl = new URL(url);
    const base = `${GITHUB_API}/repos`;
    return await httpService.get<GitHub.Repository>(`${base}${repoUrl.pathname}`);
  }

  async getContributers(repository: string | GitHub.Repository): Promise<GitHub.Contributor[]> {
    if (typeof repository === "string") {
      const repo = await this.getRepository(repository);
      return await httpService.get<GitHub.Contributor[]>(repo.contributors_url);
    }

    return await httpService.get<GitHub.Contributor[]>(repository.contributors_url);
  }

  async getCommits(repository: string | GitHub.Repository): Promise<GitHub.Commit[]> {
    if (typeof repository === "string") {
      const repo = await this.getRepository(repository);
      return await httpService.get<GitHub.Commit[]>(repo.commits_url);
    }

    return await httpService.get<GitHub.Commit[]>(repository.commits_url);
  }
}

export default new RepositoryService();
