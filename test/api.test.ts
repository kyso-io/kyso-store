import { Login, LoginProviderEnum, NormalizedResponseDTO } from '@kyso-io/kyso-model';
import { Api } from '../src/api';

describe('Authentication', () => {
    describe('Login - KYSO PROVIDER', () => {
        it('should login a valid user', async () => {
            const api: Api = new Api();

            const loginData: Login = new Login(
                "n0tiene", 
                LoginProviderEnum.KYSO,
                "lo+rey@dev.kyso.io",
                null, 
                "http://localhost:4000"
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
                "http://localhost:4000"
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
                "http://localhost:4000"
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

    describe('Generic', () => {
        it('', async () => {
            const api: Api = new Api();

            const apiVersion: string = await api.getApiVersion();

            console.log(apiVersion);
        })

        it('should return the DB Version', async () => {
            const api: Api = new Api();

            const apiVersion: string = await api.getDbVersion();

            console.log(apiVersion);
        })
    })
})