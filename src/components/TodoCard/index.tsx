import React from 'react'
import { DocumentCard, DocumentCardDetails, DocumentCardActions, IButtonProps, IDocumentCardStyles, Text, IDocumentCardDetailsStyles } from '@fluentui/react'
import Todo from '../../models/Todo'
import { DateTime } from 'luxon'
import { useDispatch } from 'react-redux'
import * as TodoStore from '../../store/Todo'
import * as TodoUtilities from '../../utilities/Todo'
import styles from './TodoCard.module.scss'

const CardStyles: IDocumentCardStyles = {
  root: { maxWidth:'100%' }
}

const CardDetailStyles: IDocumentCardDetailsStyles = {
  root: { padding: '4px 12px' }
}

interface Props extends React.HTMLProps<HTMLElement> {
  todo: Todo;
}

export default function TodoCard ({todo}: Props): JSX.Element {
  const dispatch = useDispatch()
  const date = DateTime.fromISO(todo.createdAt)

  let documentCardActions: IButtonProps[] = [
    {
      iconProps: { iconName: 'Delete' },
      onClick: (ev) => {
        ev.preventDefault()
        dispatch(TodoStore.actions.remove(todo))
      }
    }
  ]

  const cardDetailClasses = [styles.TodoCard__Details]
  if (!TodoUtilities.isArchived(todo)) {
    documentCardActions = [
      {
        iconProps: { iconName: 'Accept' },
        onClick: (ev) => {
          ev.preventDefault()
          dispatch(TodoStore.actions.update({ id: todo.id, status: TodoUtilities.status.DONE }))
        }
      }
    ]
    
    if (TodoUtilities.isDone(todo)) {
      cardDetailClasses.push(styles.TodoCard__Details__Done)
  
      documentCardActions = [
        {
          iconProps: { iconName: 'Cancel' },
          onClick: (ev) => {
            ev.preventDefault()
            dispatch(TodoStore.actions.update({ id: todo.id, status: TodoUtilities.status.ACTIVE }))
          }
        }
      ]
    }
  
    documentCardActions.push({
      iconProps: { iconName: 'Archive' },
      onClick: (ev) => {
        ev.preventDefault()
        dispatch(TodoStore.actions.update({ id: todo.id, status: TodoUtilities.status.ARCHIVED }))
      }
    })
  }
  

  return (
    <DocumentCard styles={CardStyles} className={styles.TodoCard}>
      <DocumentCardDetails styles={CardDetailStyles} className={cardDetailClasses.join(' ')}>
        <Text variant={"small"}>{date.toFormat('cccc, dd MMMM yyyy - tt')}</Text>
        <Text variant={"large"}>{todo.text}</Text>
      </DocumentCardDetails>
      <DocumentCardActions actions={documentCardActions}/>
    </DocumentCard>
  )
}
