import { BaseModel } from './base';

export type Discussion = {
    id: string;
    type: 'comment';
    text: string;
    is_edited: boolean;
    is_marked: boolean;
    marked_by: string; // nickname of the person who has marked this comments as the answered on a discussion
    created_at: string;
    updated_at: string;
    owner_nickname: string; //name under who the report is owned by (name in the url)
    parent_ids: string;
    author_id: string;
    team_id: string;
    report_id: string;
    discussion_id: string;
} & BaseModel;


