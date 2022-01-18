import { BaseModel } from './base';

export type Discussion = {
    id: string;
    name: string;
    discussion_number: number;
    type: 'discussion';
    main: string;
    number_of_comments: number;
    tags: string[];
    description: string;
    request_private: boolean;
    is_edited: boolean;
    is_closed: boolean;
    is_answered: boolean;
    created_at: Date;
    updated_at: Date;
    version_array: string;
    owner_nickname: string; //name under who the report is owned by (name in the url)
    participants: string[];  // list of participants id (a person who create a comment is a participant)
    assignees: string[]; //list of member assigned to the discussion
    author_id: string;
    comment_ids: [string];
    team_id: string;
    report_id: string;
} & BaseModel;


