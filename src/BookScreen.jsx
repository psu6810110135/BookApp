import "./App.css";
import { useState, useEffect } from "react";
import { Divider, Spin } from "antd";
import axios from "axios";
import BookList from "./components/BookList";
import AddBook from "./components/AddBook";

axios.defaults.baseURL = "http://localhost:3000";
const URL_BOOK = "/api/book";

function BookScreen() {
  const [totalAmount, setTotalAmount] = useState(0);
  const [bookData, setBookData] = useState([]);
  const [loading, setLoading] = useState(false);
  const handleLikeBook = async (bookId) => {
    setLoading(true);
    try {
      await axios.post(`${URL_BOOK}/${bookId}/like`);
      await fetchBooks();
    } catch (err) {
      console.log("Like Error:", err);
    } finally {
      setLoading(false);
    }
  };
  const handleDeleteBook = async (bookId) => {
    setLoading(true);
    try {
      await axios.delete(`${URL_BOOK}/${bookId}`);
      fetchBooks();
    } catch (err) {
      console.log("Delete Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddBook = async (book) => {
    setLoading(true);
    try {
      await axios.post(URL_BOOK, book);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
    setBookData([...bookData, book]);
  };

  const fetchBooks = async () => {
    setLoading(true);
    try {
      const response = await axios.get(URL_BOOK);
      setBookData(response.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  useEffect(() => {
    setTotalAmount(
      bookData.reduce((total, book) => total + book.price * book.stock, 0)
    );
  }, [bookData]);

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "2em",
        }}
      >
        <AddBook onBookAdded={handleAddBook} />
      </div>
      <Divider>My books worth {totalAmount.toLocaleString()} dollars</Divider>
      <Spin spinning={loading}>
        <BookList
          data={bookData}
          onLiked={handleLikeBook}
          onDeleted={handleDeleteBook}
        />
      </Spin>
    </>
  );
}

export default BookScreen;
