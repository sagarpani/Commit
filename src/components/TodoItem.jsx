import { useRef } from "react";
import { useState, useEffect } from "react";
import { useTodo } from "../context/TodoContext";

function TodoItem({ todo }) {
    const { editingTodoId, setEditingTodoId } = useTodo();

    const isTodoEditable = editingTodoId === todo.id;
    const { updateTodo, deleteTodo, toggleComplete } = useTodo();
    const [todoMsg, setTodoMsg] = useState(todo.todo);

    const inputRef = useRef();

    useEffect(() => {
        if (isTodoEditable) {
            inputRef.current.focus();
        }
    }, [isTodoEditable]);

    useEffect(() => {
        setTodoMsg(todo.todo);
    }, [todo.todo]);

    const editTodo = () => {
        if (!todoMsg?.trim()) return;
        updateTodo(todo.id, { ...todo, todo: todoMsg });
        setEditingTodoId(null);
    };

    const toggleCompleted = () => {
        toggleComplete(todo.id);
    };

    return (
        <div
            className={`
    group flex items-center gap-3 w-full px-4 py-3 rounded-xl
    transition-all duration-300
    ${todo.completed
                    ? "bg-neutral-200/60 dark:bg-neutral-900/60 dark:border-neutral-700/40  border-neutral-200/70"
                    : "bg-neutral-200 dark:bg-neutral-900 hover:bg-neutral-50 dark:hover:bg-neutral-700/70 dark:border-neutral-500/80 border-neutral-900/80"
                }
    border   hover:scale-103 active:scale-95  sm:active:scale-100 hover:duration-200
  `}
        >
            {/* Checkbox */}
            <input
                type="checkbox"
                checked={todo.completed}

                onChange={toggleCompleted}
                className="w-2 h-2 sm:w-4 sm:h-4 cursor-pointer appearance-none bg-transparent  border border-dark/40 dark:border-white/40  rounded-sm sm:rounded-md shadow-[0_0_6px_rgba(255,255,255,0.4)]  checked:bg-red-600  checked:border-red-500  transition-all duration-200
"
            />

            {/* Input / Text */}
            <input
                
                ref={inputRef}
                type="text"
                value={todoMsg}
                onChange={(e) => setTodoMsg(e.target.value)}
                readOnly={!isTodoEditable}
                className={`
          flex-1
          bg-transparent
          outline-none
          text-sm sm:text-base
          transition-all duration-200
          ${isTodoEditable
                        ? "px-2 py-1 rounded-md border dark:border-neutral-300 border-neutral-600"
                        : "border-none"
                    }
          ${todo.completed
                        ? "line-through decoration-red-500 text-neutral-500 dark:text-neutral-400"
                        : "text-neutral-800 dark:text-neutral-100"
                    }
        `}
            />

            {/* Actions */}
            <div className="flex items-center gap-2">

                {/* Edit / Save */}
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        if (todo.completed) return;

                        if (isTodoEditable) {
                            editTodo();
                            setEditingTodoId(null);
                        } else {
                            setEditingTodoId(todo.id);
                        }
                    }}
                    disabled={todo.completed}
                    className="
            w-6 h-6 md:h-8 md:w-8
            flex items-center justify-center
            rounded-lg
            text-xs
            border border-neutral-200 dark:border-neutral-600
            bg-neutral-50 dark:bg-neutral-700
            hover:bg-neutral-100 dark:hover:bg-neutral-600
            hover:opacity-90
      active:scale-90
      md:hover:translate-y-0.5

      active:shadow-inner
  active:translate-y-0.5
  transition-all duration-300
            disabled:opacity-40
          "
                >
                    {isTodoEditable ? "✔" : "✏️"}
                </button>

                {/* Delete */}
                <button
                    onClick={() => deleteTodo(todo.id)}
                    className="
            w-6 h-6 md:h-8 md:w-8
            flex items-center justify-center
            rounded-lg
            text-xs
            border border-neutral-200 dark:border-neutral-600
            bg-neutral-50 dark:bg-neutral-700
            hover:bg-red-50 dark:hover:bg-red-900/30
            hover:opacity-90
      active:scale-90
      md:hover:translate-y-0.5

      active:shadow-inner
  active:translate-y-0.5
  transition-all duration-300
          "
                >
                    ✕
                </button>

            </div>
        </div>
    );
}

export default TodoItem;