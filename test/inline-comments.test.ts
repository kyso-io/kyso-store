describe('Inline comments test suite case', () => {
  test('sumar 1 + 2 es igual a 3', () => {
    expect(1 + 2).toBe(3);
  });
  //   describe('Happy Paths', () => {
  //     it('Should create a new inline comment', async () => {
  //       const api: Api = new Api();
  //       const loginData: Login = new Login('n0tiene', LoginProviderEnum.KYSO, 'lo+rey@dev.kyso.io', null, process.env.KYSO_API as string);
  //       const loginResult: NormalizedResponseDTO<string> = await api.login(loginData);
  //       expect(loginResult.data).not.toBeNull();
  //       api.setToken(loginResult.data);
  //       const reportsOfLightside: NormalizedResponseDTO<PaginatedResponseDto<ReportDTO>> = await api.getOrganizationReports('lightside', 1);
  //       expect(reportsOfLightside.data.results).not.toBeNull();
  //       expect(reportsOfLightside.data.results).not.toBeUndefined();
  //       const report: ReportDTO = reportsOfLightside.data.results.filter((x: ReportDTO) => x.name === `rebel-scum-counterattack`)[0];
  //       expect(report).not.toBeNull();
  //       expect(report).not.toBeUndefined();
  //       expect(report.id).not.toBeNull();
  //       expect(report.id).not.toBeUndefined();
  //       const newInlineComment: CreateInlineCommentDto = new CreateInlineCommentDto();
  //       newInlineComment.cell_id = 'this_is_a_test_cell_id';
  //       newInlineComment.mentions = ['62f1421a1c48bdd4a37fdab2', '62f14225c789c4d4bcfcad47'];
  //       newInlineComment.report_id = report.id!;
  //       newInlineComment.text = 'This comment is a test';
  //       api.setOrganizationSlug(report.organization_sluglified_name);
  //       api.setTeamSlug(report.team_sluglified_name);
  //       const result: NormalizedResponseDTO<InlineCommentDto> = await api.createInlineComment(newInlineComment);
  //       expect(result.data).not.toBeNull();
  //       expect(result.data.cell_id).toEqual('this_is_a_test_cell_id');
  //       expect(result.data.mentions).toEqual(['62f1421a1c48bdd4a37fdab2', '62f14225c789c4d4bcfcad47']);
  //       expect(result.data.report_id).toEqual(report.id!);
  //       expect(result.data.text).toEqual('This comment is a test');
  //       expect(result.data.markedAsDeleted).toEqual(false);
  //       expect(result.data.edited).toEqual(false);
  //       expect(result.data.user_name).toEqual('Rey');
  //     });
  //     it('Should retrieve inline comments', async () => {
  //       // Create an inline comment
  //       const api: Api = new Api();
  //       const loginData: Login = new Login('n0tiene', LoginProviderEnum.KYSO, 'lo+rey@dev.kyso.io', null, process.env.KYSO_API as string);
  //       const loginResult: NormalizedResponseDTO<string> = await api.login(loginData);
  //       api.setToken(loginResult.data);
  //       const reportsOfLightside: NormalizedResponseDTO<PaginatedResponseDto<ReportDTO>> = await api.getOrganizationReports('lightside', 1);
  //       const report: ReportDTO = reportsOfLightside.data.results.filter((x: ReportDTO) => x.name === `rebel-scum-counterattack`)[0];
  //       const newInlineComment: CreateInlineCommentDto = new CreateInlineCommentDto();
  //       newInlineComment.cell_id = '12345678';
  //       newInlineComment.mentions = [];
  //       newInlineComment.report_id = report.id!;
  //       newInlineComment.text = 'this-comment-must-be-retrieved';
  //       api.setOrganizationSlug(report.organization_sluglified_name);
  //       api.setTeamSlug(report.team_sluglified_name);
  //       await api.createInlineComment(newInlineComment);
  //       const allInlineCommentsOfThisReport: NormalizedResponseDTO<InlineCommentDto[]> = await api.getInlineComments(report.id!);
  //       expect(allInlineCommentsOfThisReport.data).not.toBeNull();
  //       expect(allInlineCommentsOfThisReport.data).not.toBeUndefined();
  //       expect(allInlineCommentsOfThisReport.data.length).toBeGreaterThan(0);
  //       const recentlyCreatedInlineComment: InlineCommentDto = allInlineCommentsOfThisReport.data.filter((x: InlineCommentDto) => x.text === 'this-comment-must-be-retrieved')[0];
  //       expect(recentlyCreatedInlineComment).not.toBeNull();
  //       expect(recentlyCreatedInlineComment).not.toBeUndefined();
  //       expect(recentlyCreatedInlineComment.text).toBe('this-comment-must-be-retrieved');
  //       expect(recentlyCreatedInlineComment.cell_id).toBe('12345678');
  //       expect(recentlyCreatedInlineComment.mentions).toBe([]);
  //     });
  //     it('Should update an existing inline comment', async () => {
  //       // Create an inline comment
  //       const api: Api = new Api();
  //       const loginData: Login = new Login('n0tiene', LoginProviderEnum.KYSO, 'lo+rey@dev.kyso.io', null, process.env.KYSO_API as string);
  //       const loginResult: NormalizedResponseDTO<string> = await api.login(loginData);
  //       api.setToken(loginResult.data);
  //       const reportsOfLightside: NormalizedResponseDTO<PaginatedResponseDto<ReportDTO>> = await api.getOrganizationReports('lightside', 1);
  //       const report: ReportDTO = reportsOfLightside.data.results.filter((x: ReportDTO) => x.name === `rebel-scum-counterattack`)[0];
  //       const randomText = 'this-comment-must-be-edited-' + randomUUID();
  //       const newInlineComment: CreateInlineCommentDto = new CreateInlineCommentDto();
  //       newInlineComment.cell_id = '12345678';
  //       newInlineComment.mentions = [];
  //       newInlineComment.report_id = report.id!;
  //       newInlineComment.text = randomText;
  //       api.setOrganizationSlug(report.organization_sluglified_name);
  //       api.setTeamSlug(report.team_sluglified_name);
  //       await api.createInlineComment(newInlineComment);
  //       const allInlineCommentsOfThisReport: NormalizedResponseDTO<InlineCommentDto[]> = await api.getInlineComments(report.id!);
  //       const recentlyCreatedInlineComment: InlineCommentDto = allInlineCommentsOfThisReport.data.filter((x: InlineCommentDto) => x.text === randomText)[0];
  //       // Update the recently created inline comment
  //       const updateInlineCommentData: UpdateInlineCommentDto = new UpdateInlineCommentDto();
  //       updateInlineCommentData.mentions = ['mention_to_rey', 'mention_to_kylo'];
  //       updateInlineCommentData.text = randomText + '-fran_was_here';
  //       const updatedInlineComment: NormalizedResponseDTO<InlineCommentDto> = await api.updateInlineComment(recentlyCreatedInlineComment.id, updateInlineCommentData);
  //       expect(updatedInlineComment.data).not.toBeNull();
  //       expect(updatedInlineComment.data).not.toBeUndefined();
  //       expect(updatedInlineComment.data.text).toBe(randomText + '-fran_was_here');
  //       expect(updatedInlineComment.data.mentions).toBe(['mention_to_rey', 'mention_to_kylo']);
  //       expect(updatedInlineComment.data.edited).toBe(true);
  //     });
  //     it('Should delete an existing inline comment', async () => {
  //       // Create an inline comment
  //       const api: Api = new Api();
  //       const loginData: Login = new Login('n0tiene', LoginProviderEnum.KYSO, 'lo+rey@dev.kyso.io', null, process.env.KYSO_API as string);
  //       const loginResult: NormalizedResponseDTO<string> = await api.login(loginData);
  //       api.setToken(loginResult.data);
  //       const reportsOfLightside: NormalizedResponseDTO<PaginatedResponseDto<ReportDTO>> = await api.getOrganizationReports('lightside', 1);
  //       const report: ReportDTO = reportsOfLightside.data.results.filter((x: ReportDTO) => x.name === `rebel-scum-counterattack`)[0];
  //       const randomText = 'this-comment-must-be-deleted-' + randomUUID();
  //       const newInlineComment: CreateInlineCommentDto = new CreateInlineCommentDto();
  //       newInlineComment.cell_id = '12345678';
  //       newInlineComment.mentions = [];
  //       newInlineComment.report_id = report.id!;
  //       newInlineComment.text = randomText;
  //       api.setOrganizationSlug(report.organization_sluglified_name);
  //       api.setTeamSlug(report.team_sluglified_name);
  //       await api.createInlineComment(newInlineComment);
  //       let allInlineCommentsOfThisReport: NormalizedResponseDTO<InlineCommentDto[]> = await api.getInlineComments(report.id!);
  //       const recentlyCreatedInlineComment: InlineCommentDto = allInlineCommentsOfThisReport.data.filter((x: InlineCommentDto) => x.text === randomText)[0];
  //       // Delete the recently created inline comment
  //       const deletedInlineComment: NormalizedResponseDTO<boolean> = await api.deleteInlineComment(recentlyCreatedInlineComment.id);
  //       expect(deletedInlineComment.data).not.toBeNull();
  //       expect(deletedInlineComment.data).not.toBeUndefined();
  //       expect(deletedInlineComment.data).toBe(true);
  //       allInlineCommentsOfThisReport = await api.getInlineComments(report.id!);
  //       const recentlyDeletedInlineComment: InlineCommentDto = allInlineCommentsOfThisReport.data.filter((x: InlineCommentDto) => x.text === randomText)[0];
  //       expect(recentlyDeletedInlineComment).toBeUndefined();
  //     });
  //   });
});
