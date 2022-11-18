import { When } from '@cucumber/cucumber';
import { NormalizedResponseDTO, Report } from '@kyso-io/kyso-model';
import { TestContext } from './test-context';

When('calls DELETE .api.v1.reports.{string}', async function (reportId) {
  try {
    const deletionResult: NormalizedResponseDTO<Report> = await TestContext.api.deleteReport(reportId);

    if (deletionResult.data.id === reportId) {
      // That means has been deleted
      TestContext.resultInUse = 200;
    } else {
      // In other case put the result as null to force breaking the tests
      TestContext.resultInUse = null;
    }

    TestContext.resultInUse = 200;
  } catch (ex: any) {
    TestContext.resultInUse = ex.response.status;
  }
});
