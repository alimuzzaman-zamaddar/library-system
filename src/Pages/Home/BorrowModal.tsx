import { useState, useEffect } from "react";
import { useBorrowBookMutation } from "../../services/booksApi";
import toast from "react-hot-toast";

interface Props {
  bookId: string;
  maxCopies: number;
  onClose: () => void;
}

const BorrowModal: React.FC<Props> = ({ bookId, maxCopies, onClose }) => {
  const [quantity, setQuantity] = useState<number>(1);
  const [dueDate, setDueDate] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const [borrowBook, { isLoading }] = useBorrowBookMutation();

  const handleSubmit = async () => {
    if (quantity < 1 || quantity > maxCopies) {
      setError(`Quantity must be between 1 and ${maxCopies}`);
      return;
    }

    if (!dueDate) {
      setError("Please select a due date.");
      return;
    }

    try {
      const res = await borrowBook({
        book: bookId,
        quantity,
        dueDate,
      }).unwrap();
      toast.success(res.message);
      onClose();
    } catch (err: any) {
      setError(err?.data?.message || "Failed to borrow book.");
    }
  };

  // Disable scrolling while modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 animate-fade-in-up">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-[#041345]">Borrow Book</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-red-500 transition"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Quantity
            </label>
            <input
              type="number"
              min={1}
              max={maxCopies}
              value={quantity}
              onChange={e => {
                setQuantity(Number(e.target.value));
                setError(null);
              }}
              className="w-full px-3 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-[#041345] focus:outline-none"
              placeholder={`Max: ${maxCopies}`}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Due Date
            </label>
            <input
              type="date"
              value={dueDate}
              onChange={e => {
                setDueDate(e.target.value);
                setError(null);
              }}
              className="w-full px-3 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-[#041345] focus:outline-none"
            />
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="px-4 py-2 bg-[#041345] text-white rounded-lg hover:bg-[#1e2e6d] transition disabled:opacity-60"
          >
            {isLoading ? "Borrowing..." : "Borrow"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BorrowModal;
