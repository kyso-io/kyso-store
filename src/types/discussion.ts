import { BaseModel } from './base';

export type Discussion = {
    id: string;
    answered: boolean;
    assignees: string[];
    author_id: string;
    closed: boolean;
    content: string;
    comment_id: string;
    created_at: Date;
    description: string;
    discussion_number: number;
    edited: boolean;
    main: string;
    mark_delete_at: Date;
    number_of_comments: number;
    owner_name: string;
    participants: string[];
    request_private: boolean;
    team_id: string;
    title: string;
    url_name: string;
    updated_at: Date;
    version_id: string;   
} & BaseModel;


