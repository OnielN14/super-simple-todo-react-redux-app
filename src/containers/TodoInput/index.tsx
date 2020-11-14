import React, { Dispatch } from 'react'
import styles from './TodoInput.module.scss'
import { TextField, PrimaryButton, Stack, IStackProps } from '@fluentui/react'
import { connect, ConnectedProps } from 'react-redux'
import * as TodoState from '../../store/Todo'

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  addTodo: (todoText: string) => dispatch(TodoState.actions.add(todoText))
})

const stateConnectionMapper = connect(null, mapDispatchToProps)

type ReduxProps = ConnectedProps<typeof stateConnectionMapper>

const InputContainerProps: Partial<IStackProps> = {
  tokens : { childrenGap: 10 },
  horizontal: true,
  disableShrink: true
}

interface TodoInputState {
  text: string;
}

interface TodoInputProps extends ReduxProps {}

class TodoInput extends React.Component<TodoInputProps, TodoInputState> {
  constructor (props: TodoInputProps) {
    super(props)

    this.state = {
      text: ''
    }
  }

  handleSubmit =  (ev: React.FormEvent) => {
    ev.preventDefault()

    this.props.addTodo(this.state.text)
    this.setState({text:''})
  }

  render (): React.ReactNode {
    return (
      <form onSubmit={this.handleSubmit} className={styles.TodoInput}>
        <Stack {...InputContainerProps}>
          <Stack.Item grow={1}>
            <TextField type="text" value={this.state.text} onChange={(ev, value) => { this.setState({text: value || ''}) }} placeholder="Type Something" autoComplete="off"/> 
          </Stack.Item>
          <Stack.Item>
            <PrimaryButton type="submit">Add</PrimaryButton>
          </Stack.Item>
        </Stack>
      </form>
    )
  }
}

export default stateConnectionMapper(TodoInput)
