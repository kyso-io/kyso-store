import { createAction } from '@reduxjs/toolkit'

export const fetchRelationsAction = createAction<object | undefined>('relations/fetchRelations')