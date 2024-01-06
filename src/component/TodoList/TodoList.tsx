import { useEffect, useState } from 'react'
import styles from './TodoList.module.scss'
import { Todo } from '../../@types/todo.type'
import TaskInput from '../TaskInput/TaskInput'
import TaskList from '../TaskList/TaskList'
// import Title from '../Title/Title'
interface HandleNewTodo {
  (todos: Todo[]): Todo[]
}
const asyncLocal = (handleNewTodo: HandleNewTodo) => {
  const todoString = localStorage.getItem('todos')
  const todoObj: Todo[] = JSON.parse(todoString || '[]')
  const newTodoObj = handleNewTodo(todoObj)
  localStorage.setItem('todos', JSON.stringify(newTodoObj))
}
export default function TodoList() {
  const storedTodos = localStorage.getItem('todos');
const initialTodos: Todo[] = storedTodos ? (JSON.parse(storedTodos) as Todo[]) : [];

const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const doneTodos = todos.filter((todo) => todo.done)
  const notdoneTodos = todos.filter((todo) => !todo.done)
  const [currentTodo, setCurrentTodo] = useState<Todo | null>(null)
  useEffect(() => {
    const todoString = localStorage.getItem('todos')
    const todoObj: Todo[] = JSON.parse(todoString || '[]')
    setTodos(todoObj)
  }, [])
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);
  const addTodo = (name: string) => {
    const todo: Todo = {
      name,
      done: false,
      id: new Date().toISOString()
    }
    setTodos((prev) => [...prev, todo])
    asyncLocal((todosObj: Todo[]) => [...todosObj, todo])
  }
  const handleDoneTodo =  (id: string, done: boolean) => {
    setTodos((prev) => {
      console.log(prev)
      return prev.map((todo) => {
        if (todo.id === id) {
          console.log({ ...todo, done })
          return { ...todo, done }
          
        }
        return todo
      })
    })
    
  }
  
  const startEditTodo = (id: string) => {
    const findTodo = todos.find((todo) => todo.id === id)
    if (findTodo) {
      setCurrentTodo(findTodo)
    }
  }
  const editTodo = (name: string) => {
    setCurrentTodo((prev) => {
      if (prev) {
        return { ...prev, name }
      }
      return null
    })
  }
  const finishEditTodo = () => {
    const handler = (todoObj: Todo[]) => {
      return todoObj.map((todo) => {
        if (todo.id === (currentTodo as Todo).id) {
          return currentTodo as Todo
        }
        return todo
      })
    }
    setTodos(handler)
    setCurrentTodo(null)
    asyncLocal(handler)
  }
  const deleteTodo = (id: string) => {
    if (currentTodo) {
      setCurrentTodo(null)
    }
    const handler = (todoObj: Todo[]) => {
      const findedIndexTodo = todoObj.findIndex((todo) => todo.id === id)
      if (findedIndexTodo > -1) {
        const result = [...todoObj]
        result.splice(findedIndexTodo, 1)
        return result
      }
      return todoObj
    }
    setTodos(handler)
    asyncLocal(handler)
  }
  return (
    <div className={styles.todoList}>
      <div className={styles.todoListContainer}>
        <TaskInput addTodo={addTodo} currentTodo={currentTodo} editTodo={editTodo} finishEditTodo={finishEditTodo} />
        <TaskList
          todos={notdoneTodos}
          handleDoneTodo={handleDoneTodo}
          startEditTodo={startEditTodo}
          deleteTodo={deleteTodo}
        />
        <TaskList
          doneTaskList
          todos={doneTodos}
          handleDoneTodo={handleDoneTodo}
          startEditTodo={startEditTodo}
          deleteTodo={deleteTodo}
        />
      </div>
    </div>
  )
}
