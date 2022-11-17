import { When } from '@cucumber/cucumber';
import { NormalizedResponseDTO, Comment } from '@kyso-io/kyso-model';
import { TestContext } from './test-context';

When('calls DELETE .api.v1.comments.{string}', async function (commentId) {
  try {
    const deletionResult: NormalizedResponseDTO<Comment> = await TestContext.api.deleteComment(commentId);

    if (deletionResult.data.id === commentId) {
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
