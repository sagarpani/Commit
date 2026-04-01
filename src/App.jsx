import { useEffect, useState } from "react"
import { TodoProvider } from "./context/TodoContext";
import TodoForm from "./components/TodoForm";
import TodoItem from "./components/TodoItem";
import { ThemeProvider } from "./context/ThemeContext";
import ThemeBtn from "./components/ThemeBtn";
import Navbar from "./components/Navbar";


function App() {
  const [todos, setTodos] = useState([]);
  const [themeMode, setThemeMode] = useState("light");

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
    const savedTheme = JSON.parse(localStorage.getItem('themeMode')) || "light";
    setThemeMode(savedTheme);

    const html = document.querySelector('html');
    html.classList.remove("light", "dark");
    html.classList.add(savedTheme);

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
      <TodoProvider value={{ todos, addTodo, updateTodo, deleteTodo, toggleComplete }}>

        <Navbar />

        {/* Page */}
        <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 transition-colors duration-300 px-4 sm:px-6 py-8">

          <div className="max-w-2xl mx-auto">

            {/* Card */}
            <div className="
      bg-white dark:bg-neutral-900
      border border-neutral-200 dark:border-neutral-800
      rounded-2xl
      shadow-sm
      p-5 sm:p-6
    ">

              <h1 className="
        text-xl sm:text-2xl
        font-semibold tracking-tight
        text-neutral-800 dark:text-neutral-100
        text-center mb-6
      ">
                Manage Your Todos
              </h1>

              <div className="mb-5">
                <TodoForm />
              </div>

              <div className="flex flex-col gap-2.5">
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
