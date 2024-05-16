import React, { useState, useEffect } from "react";
import { Table, Button, Input } from "antd";
import axios from "axios";
import { useHistory } from "react-router-dom";
import "./UserItem.css";
import { SearchOutlined, LockOutlined, UserOutlined } from "@ant-design/icons";

const UserItem = (props) => {
  const [listUser, setListUser] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const token = "your_token_here"; // Thay thế bằng token của bạn
  const history = useHistory();

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/todos", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setListUser(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [token]);

  const handleToggleCompleted = (record) => {
    const updatedListUser = listUser.map((user) =>
      user.id === record.id ? { ...user, completed: !user.completed } : user
    );
    setListUser(updatedListUser);
  };

  const handleViewProfile = (record) => {
    history.push(`/admin/overview/${record.id}`);
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "idUs",
      align: "left",
      sorter: (record1, record2) => {
        return record1.id > record2.id;
      },
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
      align: "left",
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
        close,
      }) => (
        <div style={{ padding: 8 }}>
          <Input
            autoFocus
            placeholder="Type text here"
            value={selectedKeys[0]}
            onChange={(e) => {
              setSelectedKeys(e.target.value ? [e.target.value] : []);
              confirm({ closeDropdown: false });
            }}
            onPressEnter={() => {
              confirm();
            }}
            onBlur={() => {
              confirm();
            }}
            style={{ marginBottom: 8, display: "block" }}
          />
          <Button
            onClick={() => {
              confirm();
            }}
            icon={<SearchOutlined />}
            size="small"
            style={{ marginRight: 8, width: 90 }}
            type="primary"
          >
            Search
          </Button>
          <Button
            onClick={() => {
              clearFilters();
            }}
            size="small"
            style={{ marginRight: 8, width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </div>
      ),
      filterIcon: (filtered) => (
        <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
      ),
      onFilter: (value, record) => record.phone === value,
    },
    {
      title: "Name",
      dataIndex: "title",
      key: "title",
      align: "left",
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
        close,
      }) => (
        <div style={{ padding: 8 }}>
          <Input
            autoFocus
            placeholder="Type text here"
            value={selectedKeys[0]}
            onChange={(e) => {
              setSelectedKeys(e.target.value ? [e.target.value] : []);
              confirm({ closeDropdown: false });
            }}
            onPressEnter={() => {
              confirm();
            }}
            onBlur={() => {
              confirm();
            }}
            style={{ marginBottom: 8, display: "block" }}
          />
          <Button
            onClick={() => {
              confirm();
            }}
            icon={<SearchOutlined />}
            size="small"
            style={{ marginRight: 8, width: 90 }}
            type="primary"
          >
            Search
          </Button>
          <Button
            onClick={() => {
              clearFilters();
            }}
            size="small"
            style={{ marginRight: 8, width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </div>
      ),
      filterIcon: (filtered) => (
        <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
      ),
      onFilter: (value, record) => {
        return record.title.toLowerCase().includes(value.toLowerCase());
      },
    },
    {
      title: "Email",
      dataIndex: "title",
      key: "title",
      align: "left",
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
        close,
      }) => (
        <div style={{ padding: 8 }}>
          <Input
            autoFocus
            placeholder="Type text here"
            value={selectedKeys[0]}
            onChange={(e) => {
              setSelectedKeys(e.target.value ? [e.target.value] : []);
              confirm({ closeDropdown: false });
            }}
            onPressEnter={() => {
              confirm();
            }}
            onBlur={() => {
              confirm();
            }}
            style={{ marginBottom: 8, display: "block" }}
          />
          <Button
            onClick={() => {
              confirm();
            }}
            icon={<SearchOutlined />}
            size="small"
            style={{ marginRight: 8, width: 90 }}
            type="primary"
          >
            Search
          </Button>
          <Button
            onClick={() => {
              clearFilters();
            }}
            size="small"
            style={{ marginRight: 8, width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </div>
      ),
      filterIcon: (filtered) => (
        <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
      ),
      onFilter: (value, record) => {
        return record.title.toLowerCase().includes(value.toLowerCase());
      },
    },
    {
      title: "Trạng thái",
      dataIndex: "completed",
      key: "completed",
      align: "left",
      render: (completed) => {
        return <p>{completed ? "True" : "False"}</p>;
      },
      filters: [
        { text: "True", value: true },
        { text: "False", value: false },
      ],
      onFilter: (value, record) => {
        return record.completed === value;
      },
    },
    {
      title: "Tuỳ chọn",
      key: "action",
      align: "left",
      render: (text, record) => (
        <div className="buttonContainer">
          <Button className="btnPrf" onClick={() => handleViewProfile(record)}>
            <UserOutlined />
          </Button>
          <Button
            className="btnDel"
            onClick={() => handleToggleCompleted(record)}
          >
            <LockOutlined />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="user-item">
      <div className="adForm">
        <Table
          className="tblUser"
          size="small"
          dataSource={listUser}
          columns={columns}
          pagination={{
            current: page,
            pageSize: pageSize,
            onChange: (page, pageSize) => {
              setPage(page);
              setPageSize(pageSize);
            },
          }}
        />
      </div>
    </div>
  );
};

export default UserItem;