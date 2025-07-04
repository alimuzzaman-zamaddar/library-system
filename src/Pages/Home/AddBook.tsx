import { useState } from "react";
import { useAddBookMutation } from "../../services/booksApi";
import toast from "react-hot-toast";

export interface BookData {
  _id?: string; // <- add this line
  createdAt?: string; // <- optional but helpful
  title: string;
  author: string;
  genre: "SCIENCE" | "FICTION" | "HISTORY" | "NON_FICTION" | "BIOGRAPHY" | "FANTASY";
  isbn: string;
  description: string;
  copies: number;
  available: boolean;
}

const AddBook = () => {
  const [addBook, { isLoading }] = useAddBookMutation();
  

  const [bookData, setBookData] = useState<BookData>({
    title: "",
    author: "",
    genre: "SCIENCE",
    isbn: "",
    description: "",
    copies: 0,
    available: true,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const newValue =
      type === "checkbox"
        ? (e.target as HTMLInputElement).checked
        : value;
    setBookData({ ...bookData, [name]: newValue });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const requiredFields = [
      "title",
      "author",
      "genre",
      "isbn",
      "description",
      "copies",
    ];
    for (const field of requiredFields) {
      if (!bookData[field as keyof BookData]) {
        alert(`Please fill out the ${field} field.`);
        return;
      }
    }

    try {
      const result = await addBook(bookData).unwrap();
      console.log("Book added successfully:", result);
      toast.success("Book added successfully!");
      setBookData({
        title: "",
        author: "",
        genre: "SCIENCE",
        isbn: "",
        description: "",
        copies: 0,
        available: true,
      })
    } catch (err) {
      console.error("Failed to add book:", err);
      alert("Failed to add book.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white rounded-xl shadow-lg mt-20">
      <h2 className="text-3xl font-bold text-[#041345] mb-6">Add New Book</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-black mb-1">
            Title
          </label>
          <input
            type="text"
            name="title"
            value={bookData.title}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-[#041345]"
            placeholder="Enter title"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-black mb-1">
            Author
          </label>
          <input
            type="text"
            name="author"
            value={bookData.author}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-[#041345]"
            placeholder="Enter author"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-black mb-1">
            Genre
          </label>
          <select
            name="genre"
            value={bookData.genre}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-[#041345]"
          >
            <option value="SCIENCE">Science</option>
            <option value="FICTION">Fiction</option>
            <option value="HISTORY">History</option>
            <option value="NON_FICTION">Non-Fiction</option>
            <option value="BIOGRAPHY">Biography</option>
            <option value="FANTASY">Fantasy</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-black mb-1">
            ISBN <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="isbn"
            value={bookData.isbn}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-[#041345]"
            placeholder="Enter number (10-30 digits)"
            required
            pattern="^\d{10,30}$"
            title="Please enter a number between 10 and 30 digits"
            onInvalid={() => toast.error("Please enter a number between 10 and 30 digits")}
          />
          <span className="text-xs text-gray-500">Must be unique</span>
        </div>

        <div>
          <label className="block text-sm font-medium text-black mb-1">
            Description
          </label>
          <input
            type="text"
            name="description"
            value={bookData.description}
            onChange={handleChange}
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
            name="copies"
            value={bookData.copies}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-[#041345]"
            placeholder="Number of copies"
          />
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="available"
            checked={bookData.available}
            onChange={handleChange}
            className="accent-[#041345] w-5 h-5"
          />
          <label className="text-black">Available</label>
        </div>

        <button
          type="submit"
          className="bg-[#041345] text-white w-full py-3 rounded-md font-semibold hover:bg-opacity-90 transition duration-200"
        >
         {isLoading ? "Adding book..." : "Add Book"}
        </button>
      </form>
    </div>
  );
};

export default AddBook;
