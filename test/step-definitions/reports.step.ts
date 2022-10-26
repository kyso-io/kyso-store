import { When, Then, Given } from '@cucumber/cucumber';
import { Login, LoginProviderEnum, NormalizedResponseDTO, Report } from '@kyso-io/kyso-model';
import assert from 'assert';
import { Api } from '../../src';

let api: Api;
let resultInUse: any;
let userInUse: string | null;
let tokenInUse: string | null;
let organizationSlugInUse: string | null;
let channelSlugInUse: string | null;

Given('An unauthorized user', function () {
  userInUse = null;
  tokenInUse = null;
  organizationSlugInUse = null;
  channelSlugInUse = null;
  api = new Api();
});

Given('As user {string}', function (userEmail) {
  userInUse = userEmail;
});

Given('In {string} channel', function (channelSlug) {
  channelSlugInUse = channelSlug;
});

Given('In {string} organization', function (organizationSlug) {
  organizationSlugInUse = organizationSlug;
});

When('Logs in into the API', async function () {
  if (userInUse && organizationSlugInUse && channelSlugInUse) {
    try {
      api = new Api();

      const response: NormalizedResponseDTO<string> = await api.login(new Login('n0tiene', LoginProviderEnum.KYSO, userInUse, null, process.env.KYSO_API as string));

      tokenInUse = response.data;

      api = new Api(tokenInUse, organizationSlugInUse, channelSlugInUse);
    } catch (ex) {
      console.log(ex);
      assert.fail(`Error log in as ${userInUse} at ${process.env.KYSO_API} in org:${organizationSlugInUse} and team:${channelSlugInUse}`);
    }
  } else {
    assert.fail(`Not enough data to login user:${userInUse} at ${process.env.KYSO_API} in org:${organizationSlugInUse} and team:${channelSlugInUse}`);
  }
});

When('calls DELETE .api.v1.reports.{string}', async function (reportId) {
  try {
    const deletionResult: NormalizedResponseDTO<Report> = await api.deleteReport(reportId);
    console.log(deletionResult);
    resultInUse = null;
  } catch (ex: any) {
    resultInUse = ex.response.status;
  }
});

Then('Returns {int}', function (int) {
  const resultCopy = resultInUse;

  // Clear for next executions
  resultInUse = null;

  assert.equal(int, resultCopy);
});
