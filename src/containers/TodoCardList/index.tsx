import React, { useState } from 'react'
import TodoCard from '../../components/TodoCard'
import { DefaultButton, Stack, Text } from '@fluentui/react'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'
import * as TodoUtilities from '../../utilities/Todo'

const filterValues = [
  'All',
  TodoUtilities.status.ACTIVE,
  TodoUtilities.status.DONE,
  TodoUtilities.status.ARCHIVED,
]

export default function TodoCardList (): JSX.Element {
  const [ filter, setFilter ] = useState(
    TodoUtilities.status.ACTIVE)
  const { todos } = useSelector((state: RootState) => state.TodoState)

  const filteredTodos = todos.filter((todo) => {
    switch (filter) {
      case TodoUtilities.status.ACTIVE:
        return TodoUtilities.isActive(todo)

      case TodoUtilities.status.ARCHIVED:
        return TodoUtilities.isArchived(todo)

      case TodoUtilities.status.DONE:
        return TodoUtilities.isDone(todo)
    
      default:
        return true
    }
  })

  return (
    <Stack tokens={{ childrenGap: 8 }}>
      <Stack horizontal tokens={{childrenGap: 8}} styles={{root:{ alignItems:'center' }}}>
        <Text variant={'large'}>Filter : </Text>
        {filterValues.map((filterValue, index) => (<DefaultButton styles={{root:{flex: '1 0'}}} key={index} primary={filterValue === filter} onClick={()=> setFilter(filterValue)} text={filterValue.toLocaleUpperCase()} />))}
      </Stack>
      <Stack grow={1} tokens={{ childrenGap: 8 }}>
        { filteredTodos.length && 
          filteredTodos.map((todo) => (<TodoCard key={todo.id} todo={todo}/>)) || 
          <Stack.Item grow={1} styles={{root:{ display: 'flex', alignItems:'center', justifyContent: 'center' }}}>
            <Text variant={"large"}>Empty ({filter}) List</Text>
          </Stack.Item>}
      </Stack>
    </Stack>
  )
}