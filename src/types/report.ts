import { BaseModel } from './base';

export type Report = {
  id: string;
  name: string;
  url_name: string;
  main: string; //main file rendered
  type: 'report';
  views: number;
  stars: number;
  stargazers: object; // list of people who have started the report
  number_of_comments: number;
  analytics: any;
  provider: any;
  source: any;
  pin: boolean;
  tags: string[];
  description: string;
  request_private: boolean;
  has_metadata: boolean;
  preview: string; //preview picture
  default_code: string; //hidden, shown, both
  created_at: Date;
  updated_at: Date;
  branches_url: string;
  commits_url: string;
  tree_url: string;
  version_array: string;
  owner_nickname: string; //name under who the report is owned by (name in the url)
  auhtor_id: string[];  //It can have more than one author
  comment_ids: [string];
  team_id: string;
  report_id: string;
  children_id: string;
} & BaseModel;
