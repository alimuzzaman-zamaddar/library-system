import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useDeleteBookMutation,
  useGetBooksQuery,
} from "../../services/booksApi";
import type { BookData } from "./AddBook";
import BorrowModal from "./BorrowModal";
import toast from "react-hot-toast";

const Home = () => {
  const { data: books, error, isLoading } = useGetBooksQuery({});
  const navigate = useNavigate();
  const [deleteBook] = useDeleteBookMutation();

  const [selectedBookId, setSelectedBookId] = useState<string | null>(null);
  const [selectedBookCopies, setSelectedBookCopies] = useState<number>(0);

  const handleDelete = async (bookId: string) => {
    const confirmed = confirm("Are you sure you want to delete this book?");
    if (!confirmed) return;

    try {
      const result = await deleteBook(bookId).unwrap();
      toast.success(result.message); 
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to delete book.");
    }
  };

  if (isLoading) return <div className="text-center text-xl">Loading...</div>;
  if (error)
    return (
      <div className="text-center text-xl text-red-500">
        Error fetching books
      </div>
    );

  return (
    <div className="container mx-auto px-4 py-10 mt-20">
      <h1 className="text-4xl font-bold text-center text-[#041345] mb-10">
        Book List
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {books?.data.map((book: BookData) => (
          <div
            key={book._id}
            className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200"
          >
            <div className="flex flex-col justify-between h-full">
              {/* Title + Author */}
              <div>
                <h3 className="text-xl font-bold text-[#041345]">
                  {book.title}
                </h3>
                <p className="text-sm text-gray-800 mb-2">by {book.author}</p>

                {/* Genre Tag */}
                <span className="inline-block bg-[#041345] text-white text-xs px-3 py-1 rounded-full mb-3">
                  {book.genre}
                </span>

                {/* Description */}
                <p className="text-gray-700 text-sm mb-2">
                  {book.description?.length > 100
                    ? `${book.description.slice(0, 100)}...`
                    : book.description}
                </p>

                {/* Info Grid */}
                <div className="text-sm text-gray-700 space-y-1">
                  <p>
                    <span className="font-semibold">ISBN:</span> {book.isbn}
                  </p>
                  <p>
                    <span className="font-semibold">Copies:</span> {book.copies}
                  </p>
                  <p>
                    <span className="font-semibold">Available:</span>{" "}
                    <span
                      className={`font-semibold ${
                        book.copies > 0 ? "text-green-600" : "text-red-500"
                      }`}
                    >
                      {book.copies > 0 ? "Yes" : "No"}
                    </span>
                  </p>
                </div>
              </div>

              {/* Buttons */}
              <div className="mt-5 flex flex-wrap gap-2 justify-between">
                <button
                  onClick={() => navigate(`/books/${book._id}`)}
                  className="bg-[#041345] text-white text-sm px-4 py-2 rounded-md hover:bg-opacity-90 transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => navigate(`/details/${book._id}`)}
                  className="bg-gray-800 text-white text-sm px-4 py-2 rounded-md hover:bg-gray-700 transition"
                >
                  Details
                </button>
                <button
                  onClick={() => {
                    setSelectedBookId(book._id ?? null);
                    setSelectedBookCopies(book.copies);
                  }}
                  className="bg-green-600 text-white text-sm px-4 py-2 rounded-md hover:bg-green-700 transition"
                >
                  Borrow
                </button>
                <button
                  onClick={() => book._id && handleDelete(book._id)}
                  className="bg-red-600 text-white text-sm px-4 py-2 rounded-md hover:bg-red-700 transition"
                >
                  Delete
                </button>
              </div>

              <div className="mt-4 text-right text-xs text-gray-500 italic">
                Added on: {book.createdAt ? new Date(book.createdAt).toLocaleDateString("en-GB") : "Unknown"}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Borrow Modal */}
      {selectedBookId && (
        <BorrowModal
          bookId={selectedBookId}
          maxCopies={selectedBookCopies}
          onClose={() => setSelectedBookId(null)}
        />
      )}
    </div>
  );
};

export default Home;
