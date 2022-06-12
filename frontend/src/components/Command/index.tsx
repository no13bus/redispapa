import { Form, Input, Button } from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import React from 'react';

interface CommandValue {
  command: string;
  args: string;
}

interface PropsType {
  onSubmit: (values: CommandValue) => void;
}


const Command: React.FC<PropsType> = ({ onSubmit }) => {


  // const onFinish = (values: any) => {
  //   console.log('Success:', values);
  // };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };



  return (
    <Form
      name="basic"
      layout={"inline"}
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      onFinish={onSubmit}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Command"
        name="command"
        rules={[{ required: true, message: 'Please input command!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Args"
        name="args"
        rules={[{ required: true, message: 'Please input args' }]}
      >
        <Input />
      </Form.Item>

     

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Send
        </Button>
      </Form.Item>
    </Form>
  )

}

export default Command;