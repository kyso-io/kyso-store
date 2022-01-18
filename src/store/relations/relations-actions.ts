import { createAction } from '@reduxjs/toolkit'
import { Relation } from '../../types/relations'

export const fetchRelationsAction = createAction<Relation>('relations/fetchRelations')