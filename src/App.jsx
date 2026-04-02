import { useEffect, useState } from "react"
import { TodoProvider } from "./context/TodoContext";
import TodoForm from "./components/TodoForm";
import TodoItem from "./components/TodoItem";
import { ThemeProvider } from "./context/ThemeContext";
import ThemeBtn from "./components/ThemeBtn";
import Navbar from "./components/Navbar";


function App() {
  const [todos, setTodos] = useState([]);

  const [editingTodoId, setEditingTodoId] = useState(null);

  const [themeMode, setThemeMode] = useState(() => {
    const savedTheme = localStorage.getItem("themeMode");
    return savedTheme ? JSON.parse(savedTheme) : "light";
  });

  const darkTheme = () => {
    setThemeMode("dark")
  }

  const lightTheme = () => {
    setThemeMode("light")
  }

  useEffect(() => {
    const html = document.querySelector('html');

    html.classList.remove("light", "dark");
    html.classList.add(themeMode);
    localStorage.setItem('themeMode', JSON.stringify(themeMode));

  }, [themeMode])

  const addTodo = (todo) => {
    setTodos((prev) => [{
      id: crypto.randomUUID(),
      ...todo
    }, ...prev])
  }

  const updateTodo = (id, todo) => {
    setTodos((prev) =>
      prev.map(prevTodo =>
        prevTodo.id === id ? { ...prevTodo, ...todo } : prevTodo
      )
    )
  }

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos")) || [];

    if (todos && todos.length > 0) {
      setTodos(todos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])

  const deleteTodo = (id) => {
    setTodos((prev) =>
      prev.filter((todo) =>
        todo.id !== id
      )
    )
  }

  const toggleComplete = (id) => {
    setTodos((prev) =>
      prev.map((prevTodo) =>
        prevTodo.id === id ? { ...prevTodo, completed: !prevTodo.completed } : prevTodo
      )
    )
  }

  return (
    <ThemeProvider value={{ themeMode, lightTheme, darkTheme }}>
      <TodoProvider value={{ todos, addTodo, updateTodo, deleteTodo, toggleComplete, editingTodoId, setEditingTodoId }}>

        <Navbar />

        {/* Page */}
        <div className="h-[calc(100vh-4vh)] flex flex-col bg-neutral-100 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 transition-colors duration-300 px-4 sm:px-6 py-6">
          <div className="flex-1 flex justify-center">

            {/* Card */}
            <div className="
           overflow-hidden 
  w-full max-w-2xl
  flex flex-col
  h-[calc(100vh-100px)]  
  bg-white dark:bg-neutral-900/70 
  border border-neutral-200 dark:border-neutral-600
  rounded-2xl
  shadow-sm
">

              <div className="
  sticky top-0 z-10
  bg-white dark:bg-neutral-900/70
  p-5 sm:p-6
  border-b border-neutral-200 dark:border-neutral-700
">
                <h1 className="...">Manage Your Todos</h1>

                <div className="mt-5">
                  <TodoForm />
                </div>
              </div>

              <div className="
  flex-1 min-h-0
  overflow-y-auto
  px-5 sm:px-6 py-4
  flex flex-col gap-2.5
">
                {todos.map((todo) => (
                  <TodoItem key={todo.id} todo={todo} />
                ))}
              </div>

            </div>
          </div>
        </div>

      </TodoProvider>
    </ThemeProvider>
  );
}

export default App
