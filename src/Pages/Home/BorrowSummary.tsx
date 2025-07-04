import { useGetBorrowSummaryQuery } from "../../services/booksApi";

const BorrowSummary = () => {
  const { data, isLoading, error } = useGetBorrowSummaryQuery();

  if (isLoading)
    return <div className="text-center mt-10">Loading summary...</div>;
  if (error)
    return (
      <div className="text-center text-red-500 mt-10">
        Error fetching borrow summary.
      </div>
    );

  return (
    <div className="max-w-7xl h-screen mx-auto px-4 py-10 mt-20">
      <h2 className="text-3xl font-bold text-[#041345] mb-8 text-center">
        Borrow Summary
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.data.map((item, index) => (
          <div
            key={index}
            className="backdrop-blur-md bg-white/20 border border-alt-border rounded-xl p-6 shadow-xl transition hover:shadow-2xl hover:-translate-y-1 duration-300 text-[#041345]"
          >
            <h3 className="text-xl font-semibold mb-2">{item.book.title}</h3>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              <span className="font-medium">ISBN:</span> {item.book.isbn}
            </p>
            <p className="text-sm mt-2">
              <span className="font-medium">Total Borrowed:</span>{" "}
              <span className="text-lg font-bold text-[#0E7615]">
                {item.totalQuantity}
              </span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BorrowSummary;
