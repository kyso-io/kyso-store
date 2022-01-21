import { createAction } from '@reduxjs/toolkit'
import { Relations } from '@kyso-io/kyso-model'

export const fetchRelationsAction = createAction<Relations>('relations/fetchRelations')