export type UpdateReportRequest = {
  stars?: number;
  tags?: string[];
  title: string;
  description?: string;
  request_private?: boolean;
  name?: string;
};
