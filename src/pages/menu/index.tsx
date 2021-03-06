import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Table, Space, Modal } from 'antd';
import { getMenu, addMenu, updateMenu, deleteMenu } from '../../services/menu';

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

export default function Menu() {
  const [visible, setVisible] = useState(false);
  const [modalType, setModalType] = useState('');
  const [data, setData] = useState([]);
  const [curMenu, setCurMenu] = useState<any>({});
  const [addForm] = Form.useForm();

  const initData = () => {
    getMenu().then((res) => {
      console.log(res);
      setData(res.data);
    });
  };

  useEffect(() => {
    initData();
  }, []);

  const showModal = (type: string, data: any = '') => {
    if (type === 'add') {
      setModalType('add');
      addForm.resetFields();
    }
    if (type === 'change') {
      setModalType('change');
      addForm.setFieldsValue(data);
      setCurMenu(data);
    }
    setVisible(true);
  };

  const handleOk = async (e: any) => {
    const valid = await addForm.validateFields();
    if (valid) {
      if (modalType === 'add') {
        await addMenu(addForm.getFieldsValue());
        // dispatch(addUserModel(addForm.getFieldsValue()))
      }
      if (modalType === 'change') {
        updateMenu(curMenu.id, { ...curMenu, ...addForm.getFieldsValue() });
        // dispatch(changeUserModel(userid, addForm.getFieldsValue()))
      }
      setVisible(false);
      initData();
    }
    console.log(e, addForm.getFieldsValue());
    // setVisible(false);
  };

  const handleCancel = (e: any) => {
    console.log(e);
    setVisible(false);
  };

  const handDeleteMenu = (id: string) => {
    console.log(id);
    deleteMenu(id).then(() => {
      initData();
    });
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'menuName',
      key: 'menuName',
    },
    {
      title: '操作',
      key: 'action',
      width: 260,
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
            onClick={() => handDeleteMenu(record.id)}
            danger
          >
            删除
          </Button>
          <Button type="primary" size="small">
            新增子菜单
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Space align="center" style={{ marginBottom: 16 }}>
        <Button type="primary" onClick={() => showModal('add')}>
          新增
        </Button>
      </Space>
      <Table
        showHeader={false}
        pagination={false}
        scroll={{ y: 400 }}
        columns={columns}
        dataSource={data}
      />
      <Modal
        title={modalType === 'add' ? '新增菜单' : '修改菜单'}
        cancelText="取消"
        okText="确认"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form name="basic" form={addForm} initialValues={{ remember: true }}>
          <Form.Item
            {...formItemLayout}
            label="菜单名"
            name="menuName"
            rules={[{ required: true, message: '请输入菜单名' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
