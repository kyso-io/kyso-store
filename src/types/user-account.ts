import { LoginProviderEnum } from '../enums/login-provider.enum';

export type UserAccount = {
  type: LoginProviderEnum;
  accountId: string;
  payload: Record<string, unknown>;
};
