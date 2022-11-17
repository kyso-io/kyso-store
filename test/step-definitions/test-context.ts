import { Api } from '../../src';

export class TestContext {
  public static api: Api;
  public static resultInUse: any;
  public static userInUse: string | null;
  public static tokenInUse: string | null;
  public static organizationSlugInUse: string | null;
  public static channelSlugInUse: string | null;
}
