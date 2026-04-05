import { useState } from "react";
import { useTodo } from "../context/TodoContext";

function TodoForm() {
  const [todo, setTodo] = useState("");
  const { addTodo } = useTodo();

  const add = (e) => {
    e.preventDefault();
    if (!todo.trim()) return;

    addTodo({
      todo,
      completed: false,
    });


    setTodo("");
  };

  return (
    <form onSubmit={add} className="flex flex-col sm:flex-row gap-2">

  <input
    onKeyDown={(e) => (e.key === "Enter" && add(e))}
    value={todo}
    onChange={(e) => setTodo(e.target.value)}
    type="text"
    placeholder="Add a new task..."
    className="
      flex-1
      px-4 py-2.5
      rounded-xl
      bg-white dark:bg-neutral-900
      border border-neutral-200 dark:border-neutral-700
      text-neutral-800 dark:text-neutral-100
      placeholder:text-neutral-500 dark:placeholder:text-neutral-500
      outline-none
      focus:ring-2 focus:ring-violet-300 dark:focus:ring-violet-600
      transition-all duration-300
    "
  />

  <button
    type="submit"
    className="
      px-4 sm:px-5
      py-2.5
      
      rounded-xl
      bg-neutral-900 dark:bg-white
      text-white dark:text-neutral-900
      text-sm font-medium
      hover:opacity-90
      active:scale-90
      md:hover:translate-y-0.5

      active:shadow-inner
  active:translate-y-0.5
  transition-all duration-300
    "
  >
    Add
  </button>

</form>
  );
}
export default TodoForm;