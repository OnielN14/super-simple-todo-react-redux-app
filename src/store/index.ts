import { combineReducers, configureStore } from '@reduxjs/toolkit'
import TodoState from './Todo'

const reducer = combineReducers({ TodoState })
const store = configureStore({ reducer })

export type RootState = ReturnType<typeof reducer>
export default store