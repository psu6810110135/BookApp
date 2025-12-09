import { useState, useEffect } from "react";
import { Button, Form, Select, Input, InputNumber } from "antd";
import axios from "axios";

const URL_CATEGORY = "/api/book-category";

export default function AddBook(props) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

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
    fetchCategories();
  }, []);

  const generateId = () => {
    return Math.random().toString(36).substring(2, 15);
  };

  return (
    <Form
      layout="inline"
      onFinish={(values) => {
        props.onBookAdded({ ...values });
      }}
    >
      <Form.Item name="title" label="Title" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="author" label="Author" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="price" label="Price" rules={[{ required: true }]}>
        <InputNumber />
      </Form.Item>
      <Form.Item name="stock" label="Stock" rules={[{ required: true }]}>
        <InputNumber />
      </Form.Item>
      <Form.Item
        name="categoryId"
        label="Category"
        rules={[{ required: true }]}
      >
        <Select allowClear style={{ width: "150px" }} options={categories} />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          New Book
        </Button>
      </Form.Item>
    </Form>
  );
}
