type AlertType = 'success' | 'error' | 'warning';

type AlertBoxProps = {
  message: string;
  type?: AlertType;
  dismissable?: boolean;
};

const typeClasses: Record<AlertType, string> = {
  success: 'bg-green-100 border-green-400 text-green-700',
  error: 'bg-red-100 border-red-400 text-red-700',
  warning: 'bg-yellow-100 border-yellow-400 text-yellow-700',
};

export function AlertBox({
  message,
  type = 'success',
  dismissable = false,
}: AlertBoxProps) {
  if (!message) return null;

  return (
    <div
      className={`border-l-4 p-4 mb-4 rounded absolute right-8 ${typeClasses[type]}`}
      role="alert"
    >
      <p>{message}</p>
      {dismissable && (
        <button
          className="absolute top-1 right-2 text-lg font-bold text-inherit hover:opacity-70"
          onClick={() => alert('Dismiss clicked')}
        >
          x
        </button>
      )}
    </div>
  );
}
