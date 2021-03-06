import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Table, Space, Modal, Select } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../models';
import {
  userList,
  addUserModel,
  changeUserModel,
  deleteUserModel,
  saveQuery,
} from '../../models/user';
import dayjs from 'dayjs';

const { Option } = Select;

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

const re = /Z/;

export default function User() {
  const [visible, setVisible] = useState(false);
  const [modalType, setModalType] = useState('');
  const [userid, setUserid] = useState('');
  const [form] = Form.useForm();
  const [addForm] = Form.useForm();

  const dispatch = useDispatch();

  const userList2 = useSelector<RootState, any>(
    (state) => state.userReducer.userList,
  );

  const query = useSelector<RootState, any>((state) => state.userReducer.query);

  const total = useSelector<RootState, any>((state) => state.userReducer.total);

  const onFinish = (values: any) => {
    console.log('Received values of form:', values);
    dispatch(saveQuery({ ...query, ...values, currentPage: 1 }));
  };

  const showModal = (type: string, data: any = '') => {
    if (type === 'add') {
      setModalType('add');
      addForm.resetFields();
    }
    if (type === 'change') {
      setModalType('change');
      setUserid(data.id);
      addForm.setFieldsValue(data);
    }
    setVisible(true);
  };

  const handleOk = async (e: any) => {
    const valid = await addForm.validateFields();
    if (valid) {
      if (modalType === 'add') {
        dispatch(addUserModel(addForm.getFieldsValue()));
      }
      if (modalType === 'change') {
        dispatch(changeUserModel(userid, addForm.getFieldsValue()));
      }
      setVisible(false);
    }
    console.log(e, addForm.getFieldsValue());
    // setVisible(false);
  };

  const handleCancel = (e: any) => {
    console.log(e);
    setVisible(false);
  };

  const deleteUser = (id: string) => {
    dispatch(deleteUserModel(id));
  };

  const pageChange = (page: number, pageSize?: number) => {
    dispatch(
      saveQuery({
        ...query,
        pageSize,
        currentPage: page,
      }),
    );
  };

  useEffect(() => {
    dispatch(userList(query));
  }, [query, dispatch]);

  const columns = [
    {
      title: '用户名',
      dataIndex: 'username',
      width: 150,
    },
    {
      title: '角色',
      dataIndex: 'role',
      width: 100,
      render: (role: string) => (role === '1' ? '管理员' : '普通用户'),
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      render: (createTime: string) =>
        dayjs(createTime.replace(re, '')).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      render: (updateTime: string) =>
        dayjs(updateTime.replace(re, '')).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: '操作',
      key: 'action',
      render: (text: any, record: any) => (
        <Space size="middle">
          <Button
            type="primary"
            size="small"
            onClick={() => showModal('change', record)}
          >
            修改
          </Button>
          <Button
            type="primary"
            size="small"
            onClick={() => deleteUser(record.id)}
            danger
          >
            删除
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Form form={form} layout="inline" onFinish={onFinish}>
        <Form.Item label="用户名" name="username">
          <Input placeholder="请输入用户名" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            搜索
          </Button>
        </Form.Item>
        <Form.Item>
          <Button type="primary" onClick={() => showModal('add')}>
            新增
          </Button>
        </Form.Item>
      </Form>
      <div style={{ height: '30px' }}></div>
      <Table
        columns={columns}
        rowKey="id"
        dataSource={userList2}
        pagination={{
          onChange: pageChange,
          pageSize: query.pageSize,
          current: query.currentPage,
          total,
          showSizeChanger: true,
        }}
        scroll={{ y: 300 }}
      />
      <Modal
        title={modalType === 'add' ? '新增用户信息' : '修改用户信息'}
        cancelText="取消"
        okText="确认"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form name="basic" form={addForm} initialValues={{ remember: true }}>
          <Form.Item
            {...formItemLayout}
            label="用户名"
            name="username"
            rules={[{ required: true, message: '请输入用户名' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            {...formItemLayout}
            label="密码"
            name="password"
            rules={[{ required: true, message: '请输入密码' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            {...formItemLayout}
            label="角色"
            name="role"
            rules={[{ required: true, message: '请选择角色' }]}
          >
            <Select placeholder="请选择角色">
              <Option value="1">管理员</Option>
              <Option value="0">普通用户</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
