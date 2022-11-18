import { When, Then, Given } from '@cucumber/cucumber';
import { Login, LoginProviderEnum, NormalizedResponseDTO } from '@kyso-io/kyso-model';
import assert from 'assert';
import { Api } from '../../src';
import { TestContext } from './test-context';

Given('An unauthorized user', function () {
  TestContext.userInUse = null;
  TestContext.tokenInUse = null;
  TestContext.organizationSlugInUse = null;
  TestContext.channelSlugInUse = null;
  TestContext.api = new Api();
});

Given('As user {string}', function (userEmail) {
  TestContext.userInUse = userEmail;
});

Given('In {string} channel', function (channelSlug) {
  TestContext.channelSlugInUse = channelSlug;
});

Given('In {string} organization', function (organizationSlug) {
  TestContext.organizationSlugInUse = organizationSlug;
});

When('Logs in into the API', async function () {
  if (TestContext.userInUse && TestContext.organizationSlugInUse && TestContext.channelSlugInUse) {
    try {
      TestContext.api = new Api();

      const response: NormalizedResponseDTO<string> = await TestContext.api.login(new Login('n0tiene', LoginProviderEnum.KYSO, TestContext.userInUse, null, process.env.KYSO_API as string));

      TestContext.tokenInUse = response.data;

      TestContext.api = new Api(TestContext.tokenInUse, TestContext.organizationSlugInUse, TestContext.channelSlugInUse);
    } catch (ex) {
      console.log(ex);
      assert.fail(`Error log in as ${TestContext.userInUse} at ${process.env.KYSO_API} in org:${TestContext.organizationSlugInUse} and team:${TestContext.channelSlugInUse}`);
    }
  } else {
    assert.fail(`Not enough data to login user:${TestContext.userInUse} at ${process.env.KYSO_API} in org:${TestContext.organizationSlugInUse} and team:${TestContext.channelSlugInUse}`);
  }
});

Then('Returns {int}', function (int) {
  const resultCopy = TestContext.resultInUse;

  // Clear for next executions
  TestContext.resultInUse = null;

  assert.equal(int, resultCopy);
});
