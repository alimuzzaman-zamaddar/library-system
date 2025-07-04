// src/Pages/BookDetails.tsx
import { useParams } from "react-router-dom";
import { useGetBookQuery } from "../../services/booksApi";


const BookDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isError } = useGetBookQuery(id || "");

  if (isLoading) return <p className="text-center mt-8">Loading...</p>;
  if (isError || !data?.success)
    return (
      <p className="text-center text-red-500 mt-8">
        Failed to load book details.
      </p>
    );

  const book = data.data;

  return (
    <div className="max-w-2xl mx-auto bg-white shadow p-6 rounded-md mt-20">
      <h2 className="text-2xl font-bold mb-4">{book.title}</h2>
      <p>
        <strong>Author:</strong> {book.author}
      </p>
      <p>
        <strong>Genre:</strong> {book.genre}
      </p>
      <p>
        <strong>ISBN:</strong> {book.isbn}
      </p>
      <p>
        <strong>Description:</strong> {book.description}
      </p>
      <p>
        <strong>Copies:</strong> {book.copies}
      </p>
      <p>
        <strong>Available:</strong> {book.available ? "Yes" : "No"}
      </p>
      <p className="text-sm text-gray-500 mt-2">
        Created: {new Date(book.createdAt || "").toLocaleString()}
      </p>
    </div>
  );
};

export default BookDetails;
