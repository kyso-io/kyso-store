import { Login, LoginProviderEnum, NormalizedResponseDTO } from '@kyso-io/kyso-model';
import { Api } from '../src/api';
import { TEST_BASE_URL } from './test.constants';

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
                TEST_BASE_URL
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
                TEST_BASE_URL
            );          

            try {
                await api.login(loginData);

                // If we reach this, the test force to fail
                expect(true).toBe(false);
            } catch(ex: any) {
                expect(ex.response.status).toBe(401);
            }    
        })

        it('should refresh a token', async () => {
            const api: Api = new Api();

            const loginData: Login = new Login(
                "n0tiene", 
                LoginProviderEnum.KYSO,
                "lo+rey@dev.kyso.io",
                null, 
                TEST_BASE_URL
            );

            const result: NormalizedResponseDTO<string> = await api.login(loginData);

            expect(result.data).not.toBeNull()

            const authenticatedApi: Api = new Api(result.data);

            const refreshedToken:  NormalizedResponseDTO<string> = await authenticatedApi.refreshToken();

            expect(refreshedToken.data).not.toBeNull();
            expect(refreshedToken.data).not.toEqual(result.data)
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
                TEST_BASE_URL
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
                TEST_BASE_URL
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