// TaskList.tsx
import { useState } from 'react'
import styles from './TaskList.module.scss'
import { Todo } from '../../@types/todo.type'

interface Task {
  id: string
  name: string
  done: boolean
}

interface TaskListProps {
  doneTaskList?: boolean
  todos: Todo[]
  handleDoneTodo: (id: string, done: boolean) => void
  startEditTodo: (id: string) => void
  deleteTodo: (id: string) => void
}

export default function TaskList(props: TaskListProps) {
  const { doneTaskList, todos, handleDoneTodo, startEditTodo, deleteTodo } = props

  const  onChangeCheckbox =  (idTodo: string) =>  (event: React.ChangeEvent<HTMLInputElement>) => {
    handleDoneTodo(idTodo, event.target.checked)
  }
  return (
    <div className='mb-2'>
      <h2 className={styles.title}>{doneTaskList ? 'Hoàn thành' : 'Chưa hoàn thành'}</h2>
      <div className={styles.tasks}>
        {todos.map((todo) => (
          <div className={styles.task} key={todo.id}>
            <input
              type='checkbox'
              className={styles.taskCheckbox}
              checked={todo.done}
              onChange={onChangeCheckbox(todo.id)}
            />
            <span className={`${styles.taskName} ${todo.done ? styles.taskNameDone : ''}`}>{todo.name}</span>
            <div className={styles.taskActions}>
              <button onClick={() => startEditTodo(todo.id)} className={styles.taskBtn}>
                🖊️
              </button>
              <button onClick={() => deleteTodo(todo.id)} className={styles.taskBtn}>
                🗑️
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
