import { Then, When } from '@cucumber/cucumber';
import { NormalizedResponseDTO, Comment } from '@kyso-io/kyso-model';
import assert from 'assert';
import moment from 'moment';
import { TestContext } from './test-context';

When('calls DELETE .api.v1.comments.{string}', async function (commentId) {
  try {
    const deletionResult: NormalizedResponseDTO<Comment> = await TestContext.api.deleteComment(commentId);

    TestContext.resultDataInUse = deletionResult;

    if (deletionResult.data.id === commentId) {
      // That means has been deleted
      TestContext.resultStatusCodeInUse = 200;
    } else {
      // In other case put the result as null to force breaking the tests
      TestContext.resultStatusCodeInUse = null;
    }

    TestContext.resultStatusCodeInUse = 200;
  } catch (ex: any) {
    TestContext.resultStatusCodeInUse = ex.response.status;
  }
});

Then('Check if comment is marked as deleted', function () {
  const resultToCheck: NormalizedResponseDTO<Comment> = TestContext.resultDataInUse as NormalizedResponseDTO<Comment>;

  if (resultToCheck.data.mark_delete_at === null) {
    assert.fail("Comment's property marked_delete_at must have a value");
  } else {
    // https://stackoverflow.com/questions/7445328/check-if-a-string-is-a-date-value
    if (moment(resultToCheck.data.mark_delete_at, moment.ISO_8601, true).isValid()) {
      // all good
    } else {
      console.log('marked_delete_' + resultToCheck.data.mark_delete_at);
      assert.fail(`Comment's property marked_delete_at must be a valid Date, the received value is ${resultToCheck.data.mark_delete_at}`);
    }
  }
});
