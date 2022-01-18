import { TeamVisibilityEnum } from '../enums/team-visibility.enum';
import { BaseModel } from './base';
import { KysoRole } from './kyso-role';

export type Team = {
  id: string;
  name: string; // or user nickname
  avatar_url: string;
  bio: string;
  link: string;
  location: string;
  roles: KysoRole[];
  visibility: TeamVisibilityEnum;
  organization_id: string;
  billing_email: string;
  tax_id: string;
  subscription_id: string;
  company_name: string;
  access_domains: Array;
  access_only_gmail: boolen; //check
  connect_repos_admin_only: boolean; // check
  discussion_number: number;
} & BaseModel;
