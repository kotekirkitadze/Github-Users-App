export interface UserApi {
  name: string;
  avatar_url: string;
  type: string;
  email: string;
  repos_url: string;
  public_repos: number;
  login: string;
  repo_info?: RepositoryApi[];
}


export interface User {
  name: string;
  pic_url: string;
  userType: string;
  email: string;
  repos_url: string;
  repositories: number;
  userName: string;
  repositoriesInfo?: Repository[];
}

export interface RepositoryApi {
  name: string;
  html_url: string;
  owner?: {
    login: string;
  }
}

export interface Repository {
  repo_name: string;
  repo_url;
}

