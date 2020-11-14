import * as TodoUtilities from '../utilities/Todo'

type TodoStatusType = typeof TodoUtilities.status.ARCHIVED | typeof TodoUtilities.status.DONE | typeof TodoUtilities.status.ACTIVE

export default interface Todo {
  id: string;
  text: string;
  createdAt: string;
  status: TodoStatusType;
}
