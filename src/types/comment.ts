import { BaseModel } from './base';

export type Comment = {
    id: string;
    author_id: string;
    text: string;
    created_at: Date;
    discussion_id: string;
    edited: boolean;
    mark_delete_at: Date;
    marked: boolean;
    marked_by: string;
    owner_name: string;
    parent_id: string;
    report_id: string;
    team_id: string;
    updated_at: Date;
} & BaseModel;


