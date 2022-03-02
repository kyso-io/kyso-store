import { LoginProviderEnum } from '@kyso-io/kyso-model';
import dotenv from 'dotenv';
import {
  loginAction,
  // fetchReportCommentsAction,
  refreshUserAction,
  store,
} from './store';

dotenv.config({
  path: `${__dirname}/../.env`,
});

export const play = async () => {
  const { dispatch } = store;

  //await dispatch(loginAction({ username: 'kylo@kyso.io', password: 'n0tiene', provider: LoginProviderEnum.KYSO, payload: null }));
  /*await dispatch(setOrganization('darkside'))
  await dispatch(setTeam('private-team'))*/
  //await dispatch(refreshUserAction());

  // await dispatch(fetchReportAction({ owner: 'rey', reportName: 'reys-report' }))
  // await dispatch(fetchReportsAction())
  // await dispatch(fetchReportCommentsAction({ owner: 'rey', reportName: 'reys-report' }))

  // // console.log(getState())
};

play();
