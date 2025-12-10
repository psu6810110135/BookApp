import React, { useEffect } from "react";
import { Modal, Form, Input, InputNumber, Select, Image } from "antd";

function EditBook(props) {
  const [form] = Form.useForm();
  useEffect(() => {
    if (props.book) {
      form.setFieldsValue(props.book);
    }
  }, [props.book, form]);
  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        props.onUpdate(values);
      })
      .catch((info) => {
        console.log(`Error${info}`);
      });
  };

  if (!props.book) return null;
  return (
    <>
      <Modal
        title="Edit Book"
        open={!!props.book}
        onOk={handleOk}
        onCancel={props.onCancel}
      >
        <Form layout="vertical" form={form} onFinish={handleOk}>
          <Image
            width={150}
            src={`http://localhost:3080/${props.book.coverUrl}`}
          />
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
            <Select
              allowClear
              style={{ width: "150px" }}
              options={props.categories}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default EditBook;
