import useTheme from "../context/ThemeContext";

export default function ThemeBtn() {
  const { themeMode, lightTheme, darkTheme } = useTheme();

  const onChangeBtn = (e) => {
    const darkModeStatus = e.currentTarget.checked;
    if (darkModeStatus) darkTheme();
    else lightTheme();
  };

  return (
    <label className="flex items-center gap-3 cursor-pointer select-none group">
      
      {/* Hidden checkbox */}
      <input
        type="checkbox"
        className="sr-only peer"
        onChange={onChangeBtn}
        checked={themeMode === "dark"}
      />

      {/* Track */}
      <div
        className="
          relative w-12 h-7 rounded-full
          bg-neutral-300 dark:bg-neutral-700
          transition-colors duration-300
          peer-checked:bg-neutral-900 dark:peer-checked:bg-white
        "
      >
        {/* Knob */}
        <span
          className={`
            absolute top-1 left-1
            w-5 h-5 rounded-full
            bg-white dark:bg-neutral-900
            shadow-sm
            transition-transform duration-300
            ${themeMode === "dark" ? "translate-x-5" : "translate-x-0"}
          `}
        />
      </div>

      {/* Label */}
      <span className="hidden sm:block text-sm font-medium text-neutral-700 dark:text-neutral-200">
        {themeMode === "dark" ? "DM" : "LM"}
      </span>
    </label>
  );
}

