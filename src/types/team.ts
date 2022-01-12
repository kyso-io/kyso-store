import { TeamVisibilityEnum } from '../enums/team-visibility.enum';
import { BaseModel } from './base';
import { KysoRole } from './kyso-role';

export type Team = {
  name: string;
  avatar_url: string;
  bio: string;
  link: string;
  location: string;
  roles: KysoRole[];
  visibility: TeamVisibilityEnum;
  organization_id: string;
} & BaseModel;
