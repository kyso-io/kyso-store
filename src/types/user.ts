import { LoginProviderEnum } from '../enums/login-provider.enum';
import { BaseModel } from './base';
import { UserAccount } from './user-account';

export type User = {
  email: string;
  username: string;
  nickname: string;
  provider: LoginProviderEnum;
  bio: string;
  plan: string;
  avatar_url: string;
  email_verified: boolean;
  global_permissions: string[];
  hashed_password: string;
  accessToken: string;
  _email_verify_token?: string;
  accounts: UserAccount[];
} & BaseModel;
