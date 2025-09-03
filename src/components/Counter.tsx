import { useState } from "react";

export default function Counter() {
    const [count, setCount] = useState<number>(0);

    return (
        <div className="p-4 bg-white rounded-xl shadow-md text-center">
            <h2 className="text-2xl font-semibold mb-4">Counter</h2>
            <p className="text-lg mb-4">Current value: {count}</p>
            <div className="flex gap-4 justify-center">
                <button
                    className="px-4 py-2 bg-green-500 text-white rounded-lg"
                    onClick={() => setCount(count + 1)}
                >
                    ➕ Increment
                </button>
                <button
                    className="px-4 py-2 bg-red-500 text-white rounded-lg"
                    onClick={() => setCount(count - 1)}
                >
                    ➖ Decrement
                </button>
            </div>
        </div>
    );
}
