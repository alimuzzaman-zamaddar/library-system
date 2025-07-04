import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useDeleteBookMutation,
  useGetBooksQuery,
} from "../../services/booksApi";
import type { BookData } from "./AddBook";
import BorrowModal from "./BorrowModal";
import toast from "react-hot-toast";
import { FaPencil } from "react-icons/fa6";
import { FaRegTrashAlt } from "react-icons/fa";

const Home = () => {
  // Pagination state
  const [page, setPage] = useState(1); // Default page is 1
  const limit = 10; // Books per page
  const { data: books, error, isLoading } = useGetBooksQuery({ page, limit });
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

  // If books are still loading
  if (isLoading) return <div className="text-center text-xl text-black">Loading...</div>;

  // If error in fetching books
  if (error)
    return (
      <div className="text-center text-xl text-red-500">
        Error fetching books
      </div>
    );

  // Handle page change
  const handleNext = () => {
    if (page < books?.totalPages) {
      setPage(page + 1); // Go to the next page
    }
  };

  const handlePrevious = () => {
    if (page > 1) {
      setPage(page - 1); // Go to the previous page
    }
  };

  return (
    <div className="container mx-auto px-4 py-10 mt-20">
      <h1 className="text-4xl font-bold text-center text-[#041345] mb-10">
        Book List
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {books?.data.map((book: BookData) => (
          <div
            key={book._id}
            className="relative group bg-white p-6 rounded-3xl shadow-md hover:shadow-xl transition-all duration-500 border border-gray-200 "
          >
            {/* Dropdown menu on hover */}
            <div className="absolute top-4 right-4 hidden group-hover:flex flex-col bg-white border border-alt-border rounded-xl p-2 shadow-md z-10">
              <button
                onClick={() => navigate(`/books/${book._id}`)}
                className="flex cursor-pointer items-center gap-2 px-3 py-1 text-sm text-black hover:bg-stone-100 duration-300 "
              >
                <FaPencil /> Edit
              </button>
              <button
                onClick={() => book._id && handleDelete(book._id)}
                className="flex cursor-pointer items-center gap-2 px-3 py-1 text-sm text-red-600 hover:bg-stone-100 duration-300"
              >
                <FaRegTrashAlt /> Delete
              </button>
            </div>

            {/* Genre Tag */}
            <span className="inline-block bg-gray-100 text-gray-600 text-xs font-medium px-3 py-1 rounded-full mb-4">
              {book.genre}
            </span>

            {/* Title */}
            <h3 className="text-2xl font-bold text-black">{book.title}</h3>
            <p className="text-gray-500 mb-5">By {book.author}</p>

            {/* Details list */}
            <div className="text-sm text-gray-800 space-y-1 mb-6">
              <div className="flex">
                <span className="font-semibold w-28">Available</span>
                <span className="mr-1">:</span>
                <span className="text-black">
                  {book.copies > 0 ? "Yes" : "No"}
                </span>
              </div>
              <div className="flex">
                <span className="font-semibold w-28">Copies</span>
                <span className="mr-1">:</span>
                <span>{book.copies}</span>
              </div>
              <div className="flex">
                <span className="font-semibold w-28">ISBN</span>
                <span className="mr-1">:</span>
                <span>{book.isbn}</span>
              </div>
              <div className="flex">
                <span className="font-semibold w-28">Adding Date</span>
                <span className="mr-1">:</span>
                <span>
                  {book.createdAt
                    ? new Date(book.createdAt).toLocaleDateString("en-GB")
                    : "Unknown"}
                </span>
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => navigate(`/details/${book._id}`)}
                className="flex-1 border border-alt-border rounded-full py-2 text-black hover:text-white hover:bg-primary-blue duration-500 cursor-pointer "
              >
                Details
              </button>
              <button
                onClick={() => {
                  setSelectedBookId(book._id ?? null);
                  setSelectedBookCopies(book.copies);
                }}
                className="flex-1 bg-[#041345] text-white rounded-full py-2 hover:bg-opacity-90 transition hover:bg-white hover:text-primary-blue border border-alt-border duration-500 cursor-pointer"
              >
                Borrow
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="mt-6 flex justify-between items-center">
        <button
          onClick={handlePrevious}
          disabled={page === 1}
          className="bg-primary-blue hover:bg-white duration-500 hover:text-primary-blue border border-alt-border text-white px-4 py-2 rounded-md disabled:opacity-50"
        >
          Previous
        </button>
        <span>{`Page ${page} of ${books?.totalPages}`}</span>
        <button
          onClick={handleNext}
          disabled={page === books?.totalPages}
          className="bg-primary-blue hover:bg-white duration-500 hover:text-primary-blue border border-alt-border text-white px-4 py-2 rounded-md disabled:opacity-50"
        >
          Next
        </button>
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
