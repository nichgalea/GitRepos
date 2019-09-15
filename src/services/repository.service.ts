import * as GitHub from "@/models/github";
import httpService from "./http.service";

const GITHUB_API = "https://api.github.com";

export class RepositoryService {
  async getRepository(repositoryUrl: string): Promise<GitHub.Repository> {
    const githubUrl = new URL(repositoryUrl);
    const base = `${GITHUB_API}/repos`;
    return await httpService.get<GitHub.Repository>(`${base}${githubUrl.pathname}`);
  }

  async getContributers(contributorsUrl: string): Promise<GitHub.User[]> {
    return await httpService.get<GitHub.User[]>(contributorsUrl);
  }
}

export default new RepositoryService();
