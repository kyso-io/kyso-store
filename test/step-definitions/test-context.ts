import { Api } from '../../src';

export class TestContext {
  public static api: Api;
  public static resultStatusCodeInUse: any;
  public static resultDataInUse: any;
  public static userInUse: string | null;
  public static tokenInUse: string | null;
  public static organizationSlugInUse: string | null;
  public static channelSlugInUse: string | null;
}
