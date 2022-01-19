import { BaseModel } from './base';

export type Comment = {
    id: string;
    content: string;
    edited: boolean;
    marked: boolean;
    marked_by: string; // nickname of the person who has marked this comments as the answered on a discussion
    created_at: Date;
    updated_at: Date;
    owner_name: string; //name under who the report is owned by (name in the url)
    parent_id: string;
    author_id: string;
    team_id: string;
    report_id: string;
    discussion_id: string;
} & BaseModel;


