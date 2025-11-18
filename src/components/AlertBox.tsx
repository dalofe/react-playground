type AlertType = 'success' | 'error' | 'warning';

type AlertBoxProps = {
  message: string;
  type?: AlertType;
  dismissible?: boolean;
};

const typeClasses: Record<AlertType, string> = {
  success:
    'bg-green-100 border-green-400 text-green-700 dark:border-green-500 dark:bg-green-900/60 dark:text-green-100',
  error: 'bg-red-100 border-red-400 text-red-700',
  warning: 'bg-yellow-100 border-yellow-400 text-yellow-700',
};
/*
const typeClasses: Record<AlertType, string> = {
  success: 'bg-green-100 border-green-400 text-green-700',
  error: 'bg-red-100 border-red-400 text-red-700',
  warning: 'bg-yellow-100 border-yellow-400 text-yellow-700',
  success:
    'bg-green-100 border-green-400 text-green-700 dark:border-green-500 dark:bg-green-900/60 dark:text-green-100',
  error:
    'bg-red-100 border-red-400 text-red-700 dark:border-red-500 dark:bg-red-900/60 dark:text-red-100',
  warning:
    'bg-yellow-100 border-yellow-400 text-yellow-700 dark:border-amber-500 dark:bg-amber-900/60 dark:text-amber-100',
};
*/

export function AlertBox({
  message,
  type = 'success',
  dismissible = false,
}: AlertBoxProps) {
  if (!message) return null;

  return (
    <div
      className={`border-l-4 p-4 mb-4 rounded fixed right-8 bottom-8 shadow-md transition-opacity ${typeClasses[type]}`}
      role="alert"
    >
      <p>{message}</p>
      {dismissible && (
        <button className="absolute top-1 right-2 text-lg font-bold text-inherit hover:opacity-70">
          x
        </button>
      )}
    </div>
  );
}
