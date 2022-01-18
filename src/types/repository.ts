export type Repository = {
  id: string;
  url_name: string;
  title: string;
  description: string;
  number_of_comments: number;
  stars: number;
  views: number;
  full_name: string;
  default_branch: string;
  is_private: true;
  language: string;
  pushed_at: Date;
  report_url: string; //ui url
  api_url: string;
  provider: string;
  owner_name: string;
  user_id: string;
  team_id: string; 
};
