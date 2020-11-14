import React from 'react'
import styles from './App.module.scss'
import TodoCardList from './containers/TodoCardList'
import TodoInput from './containers/TodoInput'

interface AppShellState { }

export default class AppShell extends React.Component<any, AppShellState> {
  constructor (props: any) {
    super(props)
  }

  render (): JSX.Element {
    return (
      <div className={styles.App}>
        <TodoInput/>
        <TodoCardList/>
      </div>
    )
  }
}
