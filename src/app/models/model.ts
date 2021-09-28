export interface UserApi {
  name: string;
  avatar_url: string;
  type: string;
  email: string;
  repos_url: string;
  public_repos: number;
  login: string;
  repo_info?: RepositoryApi[];
  organizations_url?: string;
  followers: string;
  created_at: string;
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
  followers?: string;
  created_at?: string;
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

export interface OrganizationAPi {
  login: string;
  html_url: string;
  avatar_url: string;
}

export interface Organization {
  organization_name: string;
  organization_site: string;
  organization_picture: string;
}


export type userWithOrganization = User & Organization;

export interface UserResolved {
  error?: any;
  user?: userWithOrganization;
}
