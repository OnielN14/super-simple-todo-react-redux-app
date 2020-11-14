import { createSlice } from '@reduxjs/toolkit'
import { v4 } from 'uuid'
import Todo from '../models/Todo'
import * as TodoUtilities from '../utilities/Todo'
import { PayloadAction } from '@reduxjs/toolkit'

interface IState {
  todos: Todo[]
}

const initialState: IState = {
  todos: []
}

const { actions, reducer } = createSlice({
  name:'Todo',
  initialState,
  reducers: {
    add: (state, { payload }: PayloadAction<string>) => {
      state.todos.push({
        text: payload, 
        id: v4(),
        createdAt: new Date().toISOString(),
        status: TodoUtilities.status.ACTIVE
      })
    },
    update: (state, { payload }: PayloadAction<Partial<Todo>>) => {
      const { id } = payload
      const dataIndex = state.todos.findIndex(({id:existId}) => existId === id)
      
      if (dataIndex > -1) {
        state.todos[dataIndex] = {
          ...state.todos[dataIndex],
          ...payload
        }
      }
    },
    remove: (state, { payload }: PayloadAction<Todo>) => {
      const { id } = payload
      const dataIndex = state.todos.findIndex(({id:existId}) => existId === id)
      if (dataIndex > -1) state.todos.splice(dataIndex, 1)
    }
  }
})



export { actions }

export default reducer