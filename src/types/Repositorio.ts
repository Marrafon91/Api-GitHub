export type RepositoriosDTO = {
  name: string;
};

export type RepositorioFullDTO = {
  name: string;
  full_name: string;

  owner: {
    login: string;
    avatar_url: string;
  };

  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
};

export type IssueDTO = {
  id: number;
  title: string;
  html_url: string;
};
