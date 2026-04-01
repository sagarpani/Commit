import { useRef } from "react";
import { useState, useEffect } from "react";
import { useTodo } from "../context/TodoContext";

function TodoItem({ todo }) {
    const [isTodoEditable, setIsTodoEditable] = useState(false);
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
        updateTodo(todo.id, { todo: todoMsg });
        setIsTodoEditable(false);
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
                    ? "bg-neutral-200/60 dark:bg-neutral-800/60"
                    : "bg-white dark:bg-neutral-900 hover:bg-neutral-50 dark:hover:bg-neutral-800"
                }
    border border-neutral-200/50 dark:border-neutral-800/50
  `}
        >
            {/* Checkbox */}
            <input
                type="checkbox"
                checked={todo.completed}
                onChange={toggleCompleted}
                className="
          w-4 h-4
          cursor-pointer
          accent-violet-600 dark:accent-violet-300
          border border-neutral-300 dark:border-neutral-700
          bg-white dark:bg-neutral-800
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
                        ? "px-2 py-1 rounded-md border border-neutral-300 dark:border-neutral-600"
                        : "border-none"
                    }
          ${todo.completed
                        ? "line-through text-neutral-500 dark:text-neutral-400"
                        : "text-neutral-800 dark:text-neutral-100"
                    }
        `}
            />

            {/* Actions */}
            <div className="flex items-center gap-2">

                {/* Edit / Save */}
                <button
                    onClick={() => {
                        if (todo.completed) return;

                        if (isTodoEditable) {
                            editTodo();
                        } else {
                            setIsTodoEditable((prev) => !prev);
                        }
                    }}
                    disabled={todo.completed}
                    className="
            w-8 h-8
            flex items-center justify-center
            rounded-lg
            text-xs
            border border-neutral-200 dark:border-neutral-600
            bg-neutral-50 dark:bg-neutral-700
            hover:bg-neutral-100 dark:hover:bg-neutral-600
            active:scale-95
            transition-all duration-200
            disabled:opacity-40
          "
                >
                    {isTodoEditable ? "✔" : "✏️"}
                </button>

                {/* Delete */}
                <button
                    onClick={() => deleteTodo(todo.id)}
                    className="
            w-8 h-8
            flex items-center justify-center
            rounded-lg
            text-xs
            border border-neutral-200 dark:border-neutral-600
            bg-neutral-50 dark:bg-neutral-700
            hover:bg-red-50 dark:hover:bg-red-900/30
            active:scale-95
            transition-all duration-200
          "
                >
                    ✕
                </button>

            </div>
        </div>
    );
}

export default TodoItem;