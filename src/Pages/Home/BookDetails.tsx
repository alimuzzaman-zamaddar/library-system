import { useParams } from "react-router-dom";
import { useGetBookQuery } from "../../services/booksApi";
import {
  FaBook,
  FaUser,
  FaTags,
  FaBarcode,
  FaRegCalendarAlt,
  FaCopy,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";

const BookDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isError } = useGetBookQuery(id || "");

  if (isLoading)
    return <p className="text-center mt-8 text-lg">Loading book details...</p>;
  if (isError || !data?.success)
    return (
      <p className="text-center text-red-500 mt-8 text-lg">
        Failed to load book details.
      </p>
    );

  const book = data.data;

  return (
    <div className="max-w-3xl mx-auto mt-20 px-6">
      <div className="bg-white rounded-3xl shadow-lg p-8 relative border border-alt-border">
        {/* Genre tag */}
        <span className="absolute top-5 left-5 bg-gray-100 text-gray-700 px-4 py-1 text-xs font-medium rounded-full">
          {book.genre}
        </span>

        {/* Title */}
        <h2 className="text-3xl font-bold text-[#041345] mb-2 flex items-center gap-2 mt-10">
          <FaBook className="text-[#041345] " /> {book.title}
        </h2>

        {/* Author */}
        <p className="text-gray-700 text-md mb-4 flex items-center gap-2">
          <FaUser /> {book.author}
        </p>

        {/* Detail Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-sm text-gray-800">
          <div className="flex items-center gap-2">
            <FaTags className="text-[#888]" />
            <strong>Genre:</strong> {book.genre}
          </div>

          <div className="flex items-center gap-2">
            <FaBarcode className="text-[#888]" />
            <strong>ISBN:</strong> {book.isbn}
          </div>

          <div className="flex items-center gap-2">
            <FaCopy className="text-[#888]" />
            <strong>Copies:</strong> {book.copies}
          </div>

          <div className="flex items-center gap-2">
            {book.available ? (
              <FaCheckCircle className="text-green-600" />
            ) : (
              <FaTimesCircle className="text-red-500" />
            )}
            <strong>Available:</strong> {book.available ? "Yes" : "No"}
          </div>

          <div className="sm:col-span-2 flex items-start gap-2 mt-4">
            <span className="pt-1 text-[#888]">📝</span>
            <div>
              <strong>Description:</strong>
              <p className="text-gray-700 mt-1">{book.description}</p>
            </div>
          </div>
        </div>

        {/* Created Date */}
        <p className="text-xs text-gray-500 mt-6 flex items-center gap-1">
          <FaRegCalendarAlt /> Created:{" "}
          {new Date(book.createdAt || "").toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })}
        </p>
      </div>
    </div>
  );
};

export default BookDetails;
