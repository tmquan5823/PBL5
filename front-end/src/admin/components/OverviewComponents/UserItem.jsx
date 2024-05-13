import React, { useState, useEffect } from 'react';
import { Table, Button } from 'antd';
import axios from 'axios';

const UserItem = (props) => {
  const [listUser, setListUser] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://reqres.in/api/users?page=1");
        if (response && response.data && response.data.data) {
          setListUser(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'idUs',
      align: 'left',
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phone',
      key: 'phone',
      align: 'left',
    },
    {
      title: 'Name',
      dataIndex: 'first_name',
      key: 'first_name',
      align: 'left',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      align: 'left',
    },
    {
      title: 'Trạng thái',
      key: 'status',
      align: 'left',
      render: () => <span>Đã khóa</span>,
    },
    {
      title: 'Tuỳ chọn',
      key: 'action',
      align: 'left',
      render: () => (
        <>
          <Button className="btnPrf">p</Button>
          <Button className="btnDel">d</Button>
        </>
      ),
    },
  ];

  return (
    <div className="user-item">
      <div className="adForm">
        <Table dataSource={listUser} columns={columns} />
      </div>
    </div>
  );
};

export default UserItem;
