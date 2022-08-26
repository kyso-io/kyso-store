import { Login, LoginProviderEnum, NormalizedResponseDTO, UserDTO } from "@kyso-io/kyso-model";
import { Api } from "../src";

export const logAsRey = async (api: Api): Promise<NormalizedResponseDTO<UserDTO>> => {
  const loginData: Login = new Login(
    "n0tiene", 
    LoginProviderEnum.KYSO,
    "lo+rey@dev.kyso.io",
    null, 
    process.env.KYSO_API as string
  );

  const loginResult: NormalizedResponseDTO<string> = await api.login(loginData);
  api.setToken(loginResult.data);

  return await api.getUserFromToken();
};