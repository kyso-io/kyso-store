const dotenv = require('dotenv')

dotenv.config({
  path: `${__dirname}/../.env`,
});

import { 
  store, 
  loginAction, 
  fetchReportAction, 
  fetchReportsAction, 
  // fetchReportCommentsAction, 
  refreshUserAction, 
  /*setOrganization, 
  setTeam */
} from './store'

export const play = async () => {
  const { getState, dispatch } = store

  await dispatch(loginAction({ username: 'kylo@kyso.io', password: 'n0tiene', provider: 'kyso' }))
  /*await dispatch(setOrganization('darkside'))
  await dispatch(setTeam('private-team'))*/
  await dispatch(refreshUserAction())

  // await dispatch(fetchReportAction({ owner: 'rey', reportName: 'reys-report' }))
  // await dispatch(fetchReportsAction())
  // await dispatch(fetchReportCommentsAction({ owner: 'rey', reportName: 'reys-report' }))
  
  // console.log(getState())
}

play()
