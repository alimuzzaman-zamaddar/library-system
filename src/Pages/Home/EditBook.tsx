import { useParams} from "react-router-dom";
import { useForm } from "react-hook-form";

import { useEffect } from "react";
import { useGetBookQuery, useUpdateBookMutation } from "../../services/booksApi";

export interface BookData {
  title: string;
  author: string;
  genre: "SCIENCE" | "FICTION" | "HISTORY" | "ROMANCE";
  isbn: string;
  description: string;
  copies: number;
  available: boolean;
}

const EditBook = () => {
  const { id } = useParams<{ id: string }>();


  const { data: bookRes, isLoading } = useGetBookQuery(id!);
  const [updateBook] = useUpdateBookMutation();

  const { register, handleSubmit, reset } = useForm<BookData>();

  useEffect(() => {
    if (bookRes?.data) {
      const allowedGenres = ["SCIENCE", "FICTION", "HISTORY", "ROMANCE"] as const;
      const genre: BookData["genre"] =
        allowedGenres.includes(bookRes.data.genre as BookData["genre"])
          ? (bookRes.data.genre as BookData["genre"])
          : "SCIENCE";
      reset({ ...bookRes.data, genre }); // Book is inside data field
    }
  }, [bookRes, reset]);

  const onSubmit = async (data: BookData) => {
    try {
      await updateBook({ ...data, id }).unwrap();
      alert("book Edited successfully")
      // navigate("/books"); // Redirect to book list
    } catch (err) {
      console.error("Failed to update book", err);
    }
  };

  if (isLoading)
    return <div className="text-center mt-10">Loading book...</div>;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded mt-20">
      <h2 className="text-2xl font-bold mb-4">Edit Book</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          {...register("title")}
          className="w-full p-2 border rounded"
          placeholder="Title"
        />
        <input
          {...register("author")}
          className="w-full p-2 border rounded"
          placeholder="Author"
        />

        <select {...register("genre")} className="w-full p-2 border rounded">
          <option value="SCIENCE">Science</option>
          <option value="FICTION">Fiction</option>
          <option value="HISTORY">History</option>
          <option value="ROMANCE">Romance</option>
        </select>

        <input
          {...register("isbn")}
          className="w-full p-2 border rounded"
          placeholder="ISBN"
        />
        <textarea
          {...register("description")}
          className="w-full p-2 border rounded"
          placeholder="Description"
        />
        <input
          type="number"
          {...register("copies")}
          className="w-full p-2 border rounded"
          placeholder="Copies"
        />

        <div className="flex items-center gap-2">
          <input type="checkbox" {...register("available")} />
          <label>Available</label>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Update Book
        </button>
      </form>
    </div>
  );
};

export default EditBook;
