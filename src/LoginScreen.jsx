import { useState } from "react";
import { Button, Form, Input, Alert, Checkbox } from "antd";
import axios from "axios";

const URL_AUTH = "/api/auth/login";

export default function LoginScreen(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [errMsg, setErrMsg] = useState(null);
  const handleLogin = async (formData) => {
    try {
      setIsLoading(true);
      setErrMsg(null);
      const { remember, ...loginData } = formData;
      const response = await axios.post(URL_AUTH, loginData);
      const token = response.data.access_token;
      axios.defaults.headers.common = { Authorization: `bearer ${token}` };
      props.onLoginSuccess(remember, token);
    } catch (err) {
      console.log(err);
      setErrMsg(err.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Form
      onFinish={handleLogin}
      autoComplete="off"
      labelCol={{ span: 8 }}
      style={{ maxWidth: 600 }}
      initialValues={{remember: true}}
    >
      {errMsg && (
        <Form.Item>
          <Alert message={errMsg} type="error" />
        </Form.Item>
      )}

      <Form.Item label="Username" name="username" rules={[{ required: true }]}>
        <Input />
      </Form.Item>

      <Form.Item label="Password" name="password" rules={[{ required: true }]}>
        <Input.Password />
      </Form.Item>
      <Form.Item name="remember" valuePropName="checked">
        <Checkbox>Remember me</Checkbox>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={isLoading}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}
