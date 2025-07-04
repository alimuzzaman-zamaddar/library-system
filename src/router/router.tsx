import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout/Layout";
import Home from "../Pages/Home/Home";
import AddBook from "../Pages/Home/AddBook";
import EditBook from "../Pages/Home/EditBook";
import BookDetails from "../Pages/Home/BookDetails";
import BorrowSummary from "../Pages/Home/BorrowSummary";





const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/create-book",
        element: <AddBook />,
      },
      {
        path: "/books/:id",
        element: <EditBook />,
      },
      {
        path: "/details/:id",
        element: <BookDetails />,
      },
      {
        path: "/borrow-summary",
        element: <BorrowSummary />,
      },
    ],
  },
]);

export default router;
