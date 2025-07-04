# 📚 Library Management Frontend

This is the **frontend application** for a Library Management System built using **React**, **TypeScript**, **Tailwind CSS**, **RTK Query**, and **Vite**. It allows users to:

- Add, edit, and delete books
- View book details
- Borrow books with a modal interface
- Handle pagination
- Get real-time feedback using toast notifications

---

## 🚀 Tech Stack

- ⚛️ React (with Vite)
- 🧠 TypeScript
- 🎨 Tailwind CSS
- 🧰 Redux Toolkit & RTK Query
- 🔔 react-hot-toast
- 🔄 React Hook Form
- 🌐 Axios or Fetch (via RTK Query)

---

## 📂 Project Structure

src/
│
├── components/ # Reusable UI components (buttons, modals, inputs)
├── Pages/ # Page components (AddBook, EditBook, Home, BookDetails)
├── services/ # RTK Query API slice (booksApi.ts)
├── router/ # React Router config (if applicable)
├── App.tsx # Main app component
└── main.tsx # Entry point

yaml
Copy
Edit

---

## ⚙️ Setup Instructions

1. **Clone the repository:**

```bash
git clone https://github.com/your-username/library-frontend.git
cd library-frontend
Install dependencies:

bash
Copy
Edit
npm install
Start development server:

bash
Copy
Edit
npm run dev
Build for production:

bash
Copy
Edit
npm run build
🖥️ Available Pages
/ – Book listing (with pagination)

/books/add – Add a new book

/books/:id – Edit an existing book

/details/:id – Book details
