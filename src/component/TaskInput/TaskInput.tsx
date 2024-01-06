// TaskInput.tsx
import { useCallback, useMemo, useState } from 'react'
import styles from './TaskInput.module.scss'
import { Todo } from '../../@types/todo.type'
import Title from '../Title/Title'
interface TaskInputProps {
  addTodo: (name: string) => void
  currentTodo: Todo | null
  editTodo: (name: string) => void
  finishEditTodo: () => void
}

export default function TaskInput(props: TaskInputProps) {
  const { addTodo, currentTodo, editTodo, finishEditTodo } = props
  const [name, setName] = useState<string>('')
  const address =useMemo(() =>{
    return {
      street : "Nguyen An Ninh"
    }
  },[currentTodo])
  const handleClickTitle = useCallback((value:any) =>{
    console.log(value)
  },[])
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    if (currentTodo) {
      finishEditTodo()
      if (name) setName('')
    } else {
      addTodo(name)
      setName('')
    }
  }

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    if (currentTodo) {
      editTodo(value)
    } else {
      setName(value)
    }
    // setName(value);
  }

  return (
    <div>
      <Title address={address} handleClickTitle={handleClickTitle}/>
      <h1 className={styles.title}>Todolist with TypeScript</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type='text'
          placeholder='caption goes here'
          value={currentTodo ? currentTodo.name : name}
          onChange={onChangeInput}
        />
        <button type='submit'>{currentTodo ? 'Submit' : 'Add'}</button>
      </form>
    </div>
  )
}
