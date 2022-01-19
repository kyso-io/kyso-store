import { TeamVisibilityEnum } from '../enums/team-visibility.enum';
import { BaseModel } from './base';
import { KysoRole } from './kyso-role';

export type Team = {
  id: string;
  access_domains: string[];
  access_gmail_only: boolean;
  avatar_url: string;
  billing_email: string;
  bio: string;
  connect_repos_admin_only: boolean; // check
  company_name: string;
  discussions_number: number; //total number of discussions
  link: string;
  location: string;
  name: string;
  organization_id: string;
  roles: KysoRole[];
  subscription_id: string;
  tax_id: string;
  visibility: TeamVisibilityEnum;
} & BaseModel;
