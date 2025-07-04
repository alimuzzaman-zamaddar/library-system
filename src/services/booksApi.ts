import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { BookData } from "../Pages/Home/AddBook";


interface BorrowSummaryItem {
  totalQuantity: number;
  book: {
    title: string;
    isbn: string;
  };
}


interface BorrowSummaryResponse {
  success: boolean;
  message: string;
  data: BorrowSummaryItem[];
}
export const booksApi = createApi({
  reducerPath: "booksApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://library-management-server-peach-nine.vercel.app/api/",
  }),
  tagTypes: ["Books", "Borrow"],

  endpoints: builder => ({
    getBooks: builder.query({
      query: ({ page, limit }) => `books?page=${page}&limit=${limit}`,
      providesTags: ["Books"], 
    }),

    getBook: builder.query<
      { success: boolean; message: string; data: BookData },
      string
    >({
      query: id => `books/${id}`,
    }),

    addBook: builder.mutation({
      query: newBook => ({
        url: "books",
        method: "POST",
        body: newBook,
      }),
      invalidatesTags: ["Books"],
    }),

    updateBook: builder.mutation({
      query: ({ id, ...put }) => ({
        url: `books/${id}`,
        method: "PUT",
        body: put,
      }),
      invalidatesTags: ["Books"],
    }),

    deleteBook: builder.mutation<{ success: boolean; message: string }, string>(
      {
        query: bookId => ({
          url: `books/${bookId}`,
          method: "DELETE",
        }),
        invalidatesTags: ["Books"],
      }
    ),

    borrowBook: builder.mutation<
      { success: boolean; message: string },
      { book: string; quantity: number; dueDate: string }
    >({
      query: ({ book, quantity, dueDate }) => ({
        url: `borrow`,
        method: "POST",
        body: { book, quantity, dueDate },
      }),
      invalidatesTags: ["Books", "Borrow"],
    }),

    getBorrowSummary: builder.query<BorrowSummaryResponse, void>({
      query: () => "borrow",
      providesTags: ["Borrow"],
    }),
  }),
});



export const {
  useGetBooksQuery,
  useGetBookQuery,
  useAddBookMutation,
  useUpdateBookMutation,
  useDeleteBookMutation,
  useBorrowBookMutation,
  useGetBorrowSummaryQuery,
} = booksApi;