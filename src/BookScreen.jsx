import "./App.css";
import { useState, useEffect } from "react";
import { Divider, Spin, Button, Flex } from "antd";
import axios from "axios";
import BookList from "./components/BookList";
import AddBook from "./components/AddBook";
import EditBook from "./components/EditBook";

axios.defaults.baseURL = "http://localhost:3000";
const URL_BOOK = "/api/book";
const URL_CATEGORY = "/api/book-category";
function BookScreen(props) {
  const [totalAmount, setTotalAmount] = useState(0);
  const [bookData, setBookData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [editBook, setEditBook] = useState(null);
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

  const handleEditBook = async (book) => {
    setEditBook(book);
  };

  const handleUpdateBook = async (values) => {
    setLoading(true);
    try {
      const { id, category, createdAt, updatedAt, ...dataToSend } = values;
      dataToSend.price = Number(dataToSend.price);
      dataToSend.stock = Number(dataToSend.stock);
      await axios.patch(`${URL_BOOK}/${editBook.id}`, dataToSend);
      await fetchBooks();
      setEditBook(null);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await axios.get(URL_CATEGORY);
      setCategories(
        response.data.map((category) => ({
          label: category.name,
          value: category.id,
        }))
      );
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
    fetchCategories();
  }, []);

  useEffect(() => {
    setTotalAmount(
      bookData.reduce((total, book) => total + book.price * book.stock, 0)
    );
  }, [bookData]);

  return (
    <>
      <Flex gap="small" justify="center" align="center">
        <Button onClick={props.onLogout} type="primary" danger>
          Logout
        </Button>
        <AddBook onBookAdded={handleAddBook} categories={categories} />
      </Flex>
      <Divider>My books worth {totalAmount.toLocaleString()} dollars</Divider>
      <Spin spinning={loading}>
        <BookList
          data={bookData}
          onLiked={handleLikeBook}
          onDeleted={handleDeleteBook}
          onEdit={handleEditBook}
        />
      </Spin>
      <EditBook
        onCancel={() => {
          setEditBook(null);
        }}
        onUpdate={handleUpdateBook}
        book={editBook}
        categories={categories}
      />
    </>
  );
}

export default BookScreen;
