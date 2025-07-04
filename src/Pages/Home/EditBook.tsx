import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import {
  useGetBookQuery,
  useUpdateBookMutation,
} from "../../services/booksApi";

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
      const allowedGenres = [
        "SCIENCE",
        "FICTION",
        "HISTORY",
        "ROMANCE",
      ] as const;
      const genre: BookData["genre"] = allowedGenres.includes(
        bookRes.data.genre as BookData["genre"]
      )
        ? (bookRes.data.genre as BookData["genre"])
        : "SCIENCE";
      reset({ ...bookRes.data, genre });
    }
  }, [bookRes, reset]);

  const onSubmit = async (data: BookData) => {
    try {
      await updateBook({ ...data, id }).unwrap();
      alert("Book edited successfully");
    } catch (err) {
      console.error("Failed to update book", err);
    }
  };

  if (isLoading)
    return <div className="text-center mt-10">Loading book...</div>;

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white rounded-xl shadow-lg mt-20">
      <h2 className="text-3xl font-bold text-[#041345] mb-6">Edit Book</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-black mb-1">
            Title
          </label>
          <input
            {...register("title")}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-[#041345]"
            placeholder="Enter title"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-black mb-1">
            Author
          </label>
          <input
            {...register("author")}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-[#041345]"
            placeholder="Enter author"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-black mb-1">
            Genre
          </label>
          <select
            {...register("genre")}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-[#041345]"
          >
            <option value="SCIENCE">Science</option>
            <option value="FICTION">Fiction</option>
            <option value="HISTORY">History</option>
            <option value="ROMANCE">Romance</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-black mb-1">
            ISBN
          </label>
          <input
            {...register("isbn")}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-[#041345]"
            placeholder="Enter ISBN number"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-black mb-1">
            Description
          </label>
          <textarea
            {...register("description")}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-[#041345]"
            placeholder="Enter short description"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-black mb-1">
            Copies
          </label>
          <input
            type="number"
            {...register("copies")}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-[#041345]"
            placeholder="Number of copies"
          />
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            {...register("available")}
            className="accent-[#041345] w-5 h-5"
          />
          <label className="text-black">Available</label>
        </div>

        <button
          type="submit"
          className="bg-[#041345] text-white w-full py-3 rounded-md font-semibold hover:bg-opacity-90 transition duration-200"
        >
          Update Book
        </button>
      </form>
    </div>
  );
};

export default EditBook;
