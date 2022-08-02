import { Login, LoginProviderEnum, NormalizedResponseDTO } from '@kyso-io/kyso-model';
import { Api } from '../src/api';
import { verbose } from '../src/helpers/logger-helper';
import { TEST_AUTH_EXPIRED_TOKEN, TEST_AUTH_HACKED_TOKEN } from './test.constants';

describe('Authentication test suite case', () => {
    describe('Generic endpoints', () => {
        it('should identify an existing username', async () => {
            const api: Api = new Api();

            const result: NormalizedResponseDTO<boolean> = await api.isUsernameAvailable("skywalker");

            expect(result.data).toBeFalsy()
        })

        it('should identify an non-existing username', async () => {
            const api: Api = new Api();

            const result: NormalizedResponseDTO<boolean> = await api.isUsernameAvailable("papafrita");

            expect(result.data).toBeTruthy()
        })

        it('should return the api version', async () => {
            const api: Api = new Api();

            const apiVersion: string = await api.getApiVersion();

            expect(apiVersion).not.toBeNull();
            expect(apiVersion).not.toBeUndefined();
        })

        it('should return the DB Version', async () => {
            const api: Api = new Api();

            const dbVersion: string = await api.getDbVersion();

            expect(dbVersion).not.toBeNull();
            expect(dbVersion).not.toBeUndefined();

        })
    })

    describe('Login - KYSO PROVIDER', () => {
        it('should login a valid user', async () => {
            const api: Api = new Api();

            const loginData: Login = new Login(
                "n0tiene", 
                LoginProviderEnum.KYSO,
                "lo+rey@dev.kyso.io",
                null, 
                process.env.KYSO_API as string
            );

            const result: NormalizedResponseDTO<string> = await api.login(loginData);

            expect(result.data).not.toBeNull()
        })

        it('should reject a non-valid user and throw a 401', async () => {
            const api: Api = new Api();

            const loginData: Login = new Login(
                "n0tiene2", 
                LoginProviderEnum.KYSO,
                "lo+rey@dev.kyso.io2",
                null, 
                process.env.KYSO_API as string
            );          

            try {
                await api.login(loginData);

                // If we reach this, the test force to fail
                expect(true).toBe(false);
            } catch(ex: any) {
                expect(ex.response.status).toBe(401);
            }    
        })

        it('should refresh a valid token with another valid token', async () => {
            const api: Api = new Api();

            const loginData: Login = new Login(
                "n0tiene", 
                LoginProviderEnum.KYSO,
                "lo+rey@dev.kyso.io",
                null, 
                process.env.KYSO_API as string
            );

            const result: NormalizedResponseDTO<string> = await api.login(loginData);

            expect(result.data).not.toBeNull()
            console.log(result.data);

            const authenticatedApi: Api = new Api(result.data);

            const refreshedToken:  NormalizedResponseDTO<string> = await authenticatedApi.refreshToken();

            expect(refreshedToken.data).not.toBeNull();
            expect(refreshedToken.data).not.toEqual(result.data)
        })

        it('should refresh an expired token with another valid token', async () => {
            const api: Api = new Api();
            api.configure(process.env.KYSO_API as string + "/api/v1", TEST_AUTH_EXPIRED_TOKEN);

            
            const refreshedToken: NormalizedResponseDTO<string> = await api.refreshToken();

            expect(refreshedToken.data).not.toBeNull();
            expect(refreshedToken.data).not.toBe(TEST_AUTH_EXPIRED_TOKEN)
        })

        it('should not refresh a token not issued by us', async () => {
            const api: Api = new Api();
            api.configure(process.env.KYSO_API as string, TEST_AUTH_HACKED_TOKEN);

            try {
                const refreshedToken: NormalizedResponseDTO<string> = await api.refreshToken();

                // should not execute this line... this force it to fail
                expect(refreshedToken).toBeGreaterThanOrEqual(4);
            } catch(ex) {
                let errorMessage = "Unexpected error. This will make the test fail";
                
                if (ex instanceof Error) {
                    errorMessage = ex.message;
                }

                expect(errorMessage).toBe("Request failed with status code 403");
            }
        })


        it('should identify an existing username', async () => {
            const api: Api = new Api();

            const result: NormalizedResponseDTO<boolean> = await api.isUsernameAvailable("skywalker");

            expect(result.data).toBeFalsy()
        })

        it('should identify an non-existing username', async () => {
            const api: Api = new Api();

            const result: NormalizedResponseDTO<boolean> = await api.isUsernameAvailable("papafrita");

            expect(result.data).toBeTruthy()
        })
    })

    describe('Login - KYSO_ACCESS_TOKEN PROVIDER', () => {
        it('should login a valid user', async () => {
            const api: Api = new Api();

            const loginData: Login = new Login(
                "abcdef123456", 
                LoginProviderEnum.KYSO_ACCESS_TOKEN,
                "lo+rey@dev.kyso.io",
                null, 
                process.env.KYSO_API as string
            );

            const result: NormalizedResponseDTO<string> = await api.login(loginData);

            expect(result.data).not.toBeNull();
        })

        it('should reject a non-valid user and throw a 401', async () => {
            const api: Api = new Api();

            const loginData: Login = new Login(
                "n0tiene2", 
                LoginProviderEnum.KYSO,
                "lo+rey@dev.kyso.io2",
                null, 
                process.env.KYSO_API as string
            );          

            try {
                await api.login(loginData);

                // If we reach this, the test force to fail
                expect(true).toBe(false);
            } catch(ex: any) {
                expect(ex.response.status).toBe(401);
            }    
        })
    })
})