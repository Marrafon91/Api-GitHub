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

export type LabelDTO = {
  id: number;
  name: string;
  color?: string;
};

export type IssueDTO = {
  id: number;
  title: string;
  user: {
    login: string;
    avatar_url: string;
  };
  html_url: string;
  labels: LabelDTO[];
};

export type Filter = {
  label: string;
  value: string;
};

export type StateFiltersProps = {
  filters: Filter[];
  activeFilter: number;
  setActiveFilter: (index: number) => void;
};
