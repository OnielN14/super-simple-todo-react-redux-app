import Todo from '../../models/Todo'
import * as status from './status'

function isDone ({ status:dataStatus }: Todo): boolean {
  return dataStatus === status.DONE
}

function isArchived ({ status:dataStatus }: Todo): boolean {
  return dataStatus === status.ARCHIVED
}

function isActive ({ status:dataStatus }: Todo): boolean {
  return dataStatus === status.ACTIVE
}

export { status, isArchived, isDone, isActive }