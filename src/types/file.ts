export type File = {
    id: string;
    name: string;
    size: number;
    sha: string; 
    file: File; //downloadable by using its url
    team_id: string;
    user_id: string;
    report_id: string;
    discussion_id: string;
  };
  