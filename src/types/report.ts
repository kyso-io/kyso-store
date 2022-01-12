import { BaseModel } from './base';

export type Report = {
  name: string;
  type: 'report';
  views: number;
  stars: number;
  number_of_comments: number;
  analytics: any;
  provider: any;
  source: any;
  pin: boolean;
  tags: string[];
  description: string;
  request_private: boolean;
  user_id: string;
  comment_ids: [string];
  team_id: string;
} & BaseModel;
