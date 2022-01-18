import { BaseModel } from './base';

export type Comment = {
  text: string;
  user_id: string;
  username: string;
  report_id: string;
  comment_id: string;
} & BaseModel;
