import { Login, LoginProviderEnum, ReportDTO, NormalizedResponseDTO, PaginatedResponseDto, DraftReport, UserDTO, Organization } from '@kyso-io/kyso-model';
import { Api } from '../src/api';
import { logAsRey } from './test-helper';
import { TEST_REPORTS_PUBLIC_TEAM_BIG_FILE_ID, TEST_REPORTS_PUBLIC_TEAM_FILE_ID } from './test.constants';

describe('Reports test suite case', () => {
    describe('Files', () => {
        it('createKysoReportAction with huge files', async () => {
            const api: Api = new Api();
            
            api.configure("https://kyso.io/api/v1");

            const buffer: Buffer = await api.getReportFileContent(TEST_REPORTS_PUBLIC_TEAM_FILE_ID);
            
            expect(buffer).not.toBeNull();
            expect(buffer).not.toBeUndefined();

            // Decode the buffer
            const stringBuffer = Buffer.from(buffer).toString("utf-8")
            const jsonBuffer = JSON.parse(stringBuffer);

            // Check that config_version is 1.11
            expect(jsonBuffer).not.toBeNull();
            expect(jsonBuffer).not.toBeUndefined();
            expect(jsonBuffer.config_version).toBe("1.11");
        })

        it('should download an existing BIG file of a public report by unauthorized user with progress bar', async () => {
            const api: Api = new Api();
            
            api.configure("https://kyso.io/api/v1");

            const buffer: Buffer = await api.getReportFileContent(TEST_REPORTS_PUBLIC_TEAM_BIG_FILE_ID, {
                transformResponse: (data) => {
                    expect(data).not.toBeNull();
                    expect(data).not.toBeUndefined();

                    return data;
                },
              });
            
            expect(buffer).not.toBeNull();
            expect(buffer).not.toBeUndefined();
        })
    })

    describe('Drafts', () => {
        it('Create Draft Report', async () => {
            const api: Api = new Api();

            const rey: NormalizedResponseDTO<UserDTO> = await logAsRey(api);
            const lightside: NormalizedResponseDTO<Organization> = await api.getOrganizationBySlug("lightside");
            const protectedTeam: NormalizedResponseDTO<Team> = await api.
            const draft: DraftReport = new DraftReport(
                "This is a draft report",
                "With a good description",
                rey.data.id, // creator_user_id
            )

            api.createUiDraftReport()
            const reportsOfLightside: NormalizedResponseDTO<PaginatedResponseDto<ReportDTO>> 
                = await api.getOrganizationReports('lightside', 1);

            console.log(reportsOfLightside.data);

            expect(2).toBe(2)
        })

    })
})