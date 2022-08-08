import { CreateInlineCommentDto, InlineCommentDto, Login, LoginProviderEnum, NormalizedResponseDTO, PaginatedResponseDto, ReportDTO } from '@kyso-io/kyso-model';
import { Api } from '../src/api';
import { TEST_REPORTS_PUBLIC_TEAM_BIG_FILE_ID, TEST_REPORTS_PUBLIC_TEAM_FILE_ID } from './test.constants';

describe('Inline comments test suite case', () => {
    it('Should create a new inline comment', async () => {
        try {
            const api: Api = new Api();

            const loginData: Login = new Login(
                "n0tiene", 
                LoginProviderEnum.KYSO,
                "lo+rey@dev.kyso.io",
                null, 
                process.env.KYSO_API as string
            );

            const loginResult: NormalizedResponseDTO<string> = await api.login(loginData);
            expect(loginResult.data).not.toBeNull();

            api.setToken(loginResult.data);
            
            const reportsOfLightside: NormalizedResponseDTO<PaginatedResponseDto<ReportDTO>> 
                = await api.getOrganizationReports('lightside', 1);

            expect(reportsOfLightside.data.results).not.toBeNull();
            expect(reportsOfLightside.data.results).not.toBeUndefined();
            
            const report: ReportDTO = reportsOfLightside.data.results.filter(
                (x: ReportDTO) =>x.name === `rebel-scum-counterattack`)[0];

            expect(report).not.toBeNull();
            expect(report).not.toBeUndefined();
            expect(report.id).not.toBeNull();
            expect(report.id).not.toBeUndefined();

            const newInlineComment: CreateInlineCommentDto = new CreateInlineCommentDto();
            newInlineComment.cell_id = "this_is_a_test_cell_id";
            newInlineComment.mentions = ["62f1421a1c48bdd4a37fdab2", "62f14225c789c4d4bcfcad47"];
            newInlineComment.report_id = report.id!;    
            newInlineComment.text = "This comment is a test";

            api.setOrganizationSlug(report.organization_sluglified_name);
            api.setTeamSlug(report.team_sluglified_name)
            
            const result: NormalizedResponseDTO<InlineCommentDto> = await api.createInlineComment(newInlineComment);

            expect(result.data).not.toBeNull()
                
            expect(result.data.cell_id).toEqual("this_is_a_test_cell_id");
            expect(result.data.mentions).toEqual(["62f1421a1c48bdd4a37fdab2", "62f14225c789c4d4bcfcad47"]);
            expect(result.data.report_id).toEqual(report.id!);
            expect(result.data.text).toEqual("This comment is a test");
            expect(result.data.markedAsDeleted).toEqual(false);
            expect(result.data.edited).toEqual(false);
            expect(result.data.user_name).toEqual("Rey");
        } catch(ex) {
            console.log(ex);
            expect(true).toBe(false);
        }
    })

    it('Should retrieve inline comments', async () => {
        try {
            // Create an inline comment
            const api: Api = new Api();

            const loginData: Login = new Login(
                "n0tiene", 
                LoginProviderEnum.KYSO,
                "lo+rey@dev.kyso.io",
                null, 
                process.env.KYSO_API as string
            );

            const loginResult: NormalizedResponseDTO<string> = await api.login(loginData);
            api.setToken(loginResult.data);
            
            const reportsOfLightside: NormalizedResponseDTO<PaginatedResponseDto<ReportDTO>> 
                = await api.getOrganizationReports('lightside', 1);

            const report: ReportDTO = reportsOfLightside.data.results.filter(
                (x: ReportDTO) => x.name === `rebel-scum-counterattack`)[0];

            const newInlineComment: CreateInlineCommentDto = new CreateInlineCommentDto();
            newInlineComment.cell_id = "12345678";
            newInlineComment.mentions = [];
            newInlineComment.report_id = report.id!;    
            newInlineComment.text = "this-comment-must-be-retrieved";

            api.setOrganizationSlug(report.organization_sluglified_name);
            api.setTeamSlug(report.team_sluglified_name)
            
            await api.createInlineComment(newInlineComment);

            const allInlineCommentsOfThisReport: NormalizedResponseDTO<InlineCommentDto[]> = await api.getInlineComments(report.id!);

            expect(allInlineCommentsOfThisReport.data).not.toBeNull();
            expect(allInlineCommentsOfThisReport.data).not.toBeUndefined();
            expect(allInlineCommentsOfThisReport.data.length).toBeGreaterThan(0);
            
            const recentlyCreatedInlineComment: InlineCommentDto = allInlineCommentsOfThisReport.data.filter(
                (x: InlineCommentDto) => x.text === "this-comment-must-be-retrieved")[0];

            expect(recentlyCreatedInlineComment).not.toBeNull();
            expect(recentlyCreatedInlineComment).not.toBeUndefined();
            expect(recentlyCreatedInlineComment.text).toBe("this-comment-must-be-retrieved");
            expect(recentlyCreatedInlineComment.cell_id).toBe("12345678");
            expect(recentlyCreatedInlineComment.mentions).toBe([]);
        } catch(ex) {
            console.log(ex);
            expect(true).toBe(false);
        }
    })

    it('Should update an existing inline comment', async () => {
        expect(false).toBe(true)
    })

    it('Should delete an existing inline comment', async () => {
        expect(false).toBe(true)
    })
})