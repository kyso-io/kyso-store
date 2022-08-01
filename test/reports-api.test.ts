import { Api } from '../src/api';
import { TEST_REPORTS_PUBLIC_TEAM_BIG_FILE_ID, TEST_REPORTS_PUBLIC_TEAM_FILE_ID } from './test.constants';

describe('Reports test suite case', () => {
    describe('Files', () => {
        it('should download an existing file of a public report by unauthorized user without Axios Request Config', async () => {
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
})