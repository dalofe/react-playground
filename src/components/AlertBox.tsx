type AlertType = 'success' | 'error' | 'warning';

interface AlertBoxProps {
  message: string;
  type?: AlertType;
  dismissible?: boolean;
};

const typeClasses: Record<AlertType, string> = {
  success:
    'bg-green-100 border-green-400 text-green-700 dark:border-green-500 dark:bg-green-900/60 dark:text-green-100',
  error:
    'bg-red-100 border-red-400 text-red-700 dark:border-red-500 dark:bg-red-900/60 dark:text-red-100',
  warning:
    'bg-yellow-100 border-yellow-400 text-yellow-700 dark:border-amber-500 dark:bg-amber-900/60 dark:text-amber-100',
};

export function AlertBox({
  message,
  type = 'success',
  dismissible = false,
}: AlertBoxProps) {
  if (!message) return null;

  return (
    <div
      className={`fixed bottom-8 right-8 mb-4 rounded border-l-4 p-4 shadow-md transition-opacity dark:shadow-lg ${typeClasses[type]}`}
      role="alert"
    >
      <p>{message}</p>
      {dismissible && (
        <button
          className="absolute right-2 top-1 text-lg font-bold text-inherit transition
        hover:opacity-70
        focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2
        dark:focus:ring-blue-600"
        >
          x
        </button>
      )}
    </div>
  );
}
