import { BaseModel } from './base';

export type Discussion = {
    id: string;
    url_name: string;
    title: string;
    discussion_number: number;
    type: 'discussion';
    main: string;
    number_of_comments: number;
    tags: Array;
    description: string;
    request_private: boolean;
    edited: boolean;
    closed: boolean;
    answered: boolean;
    created_at: Date;
    updated_at: Date;
    version_id: string;
    participants: Array;  // list of participants id (a person who create a comment is a participant)
    assignees: Array; //list of member assigned to the discussion
    owner_name: string; //name under who the report is owned by (name in the url)
    author_id: string;
    comment_ids: [string];
    team_id: string;
} & BaseModel;


