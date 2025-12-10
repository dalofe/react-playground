interface SelectOption<T extends string | number> {
  value: T;
  label: string;
}

interface SelectProps<T extends string | number> {
  label?: string;
  value: T;
  onChange: (value: T) => void;
  options: SelectOption<T>[];
  className?: string;
}

export function Select<T extends string | number>({
  label,
  value,
  onChange,
  options,
  className = '',
}: SelectProps<T>) {
  const baseStyles =
    'w-full border border-gray-300 dark:border-gray-600 rounded-md p-2 text-sm bg-white dark:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-500';

  return (
    <div className={`flex flex-col gap-1 w-full ${className}`}>
      {label && (
        <label className="mr-2 font-semibold text-sm text-gray-700 dark:text-gray-300">
          {label}
        </label>
      )}

      <select
        className={baseStyles}
        value={value}
        onChange={(e) => onChange(e.target.value as T)}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
