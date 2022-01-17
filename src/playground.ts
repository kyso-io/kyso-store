const dotenv = require('dotenv')

dotenv.config({
  path: `${__dirname}/../.env`,
});

import { store, loginAction, fetchReportsAction, refreshUserAction, setOrganization, setTeam } from './store'

export const populate = async (store: any) => {
  const { getState, dispatch } = store
  
  await dispatch(loginAction({ username: 'kylo@kyso.io', password: 'n0tiene', provider: 'kyso' }))
  await dispatch(setOrganization('darkside'))
  await dispatch(setTeam('private-team'))
  await dispatch(refreshUserAction())

  await dispatch(fetchReportsAction())

  console.log(getState().reports)
}

populate(store)
