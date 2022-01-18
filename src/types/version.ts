export type Version = {
    id: string;
    file_map: object; //check
    files_array: Array; //list of files/folder in a version
    sha: string;
    main: string;
    created_at: Date;
    updated_at: Date;
    // pkg
    team_id: string;
    user_id: string;
    report_id: string;
    discussion_id: string;
    file_id: string;
    repo_id: string //we are fetching so thi si snot needed
  };
  