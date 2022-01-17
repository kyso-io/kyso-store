import { LoginProviderEnum } from '../enums/login-provider.enum';
import { BaseModel } from './base';
import { UserAccount } from './user-account';

export type User = {
  id: string;
  email: string;
  username: string;
  nickname: string;
  provider: LoginProviderEnum;
  github_id: string; // not sure if this is longer needit
  bio: string;
  location: string;
  link: string;
  subscription_id: string;
  plan: string;
  avatar_url: string;
  email_verified: boolean;
  global_permissions: string[];
  hashed_password: string;
  access_token: string;
  _email_verify_token?: string;
  accounts: UserAccount[];
  team_id: string[]; // dont know if this information will be in global permission
} & BaseModel;
