import { LoginProviderEnum } from '../enums/login-provider.enum';
import { BaseModel } from './base';
import { UserAccount } from './user-account';

export type User = {
  id: string;
  access_token: string;
  accounts: UserAccount[];
  avatar_url: string;
  bio: string;
  email: string;
  email_verify_token?: string; //check with dani -> verified_email
  github_id: string; // not sure if this is longer needed it
  global_permissions: string[];
  hashed_password: string;
  location: string;
  link: string;
  name: string; //same for team
  organization_id: string;
  plan: string;
  provider: LoginProviderEnum;
  subscription_id: string;
  username: string;  
  team_id: string[]; // dont know if this information will be in global permission
  verified_email: boolean;
} & BaseModel;
