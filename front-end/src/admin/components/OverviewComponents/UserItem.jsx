import React, { useState, useEffect } from "react";
import { Table, Button, Input } from "antd";
import axios from "axios";
import "./UserItem.css";
import { SearchOutlined } from "@ant-design/icons";
import { LockOutlined } from "@ant-design/icons";
import { UserOutlined } from "@ant-design/icons";

const UserItem = (props) => {
  const [listUser, setListUser] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get("https://jsonplaceholder.typicode.com/todos");
  //       if (response && response.data && response.data.data) {
  //         // setListUser(response.data.data);
  //         console.log(response);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/todos")
      .then((response) => {
        setListUser(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        // Thực hiện các công việc cần thiết sau khi gọi API
      });
  }, []);

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
      }) => {
        return (
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
            ></Input>
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
        );
      },
      filterIcon: () => {
        return <SearchOutlined />;
      },
      onFilter: (value, record) => {
        return record.phone == value;
      },
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
      }) => {
        return (
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
            ></Input>
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
        );
      },
      filterIcon: () => {
        return <SearchOutlined />;
      },
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
      }) => {
        return (
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
            ></Input>
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
        );
      },
      filterIcon: () => {
        return <SearchOutlined />;
      },
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
      render: () => (
        <div className="buttonContainer">
          <Button className="btnPrf">
            <UserOutlined />
          </Button>
          <Button className="btnDel">
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
          style={{}}
          dataSource={listUser}
          columns={columns}
          pagination={{
            current: page, //trang hiển thị đầu tiên khi truy cập
            pageSize: pageSize, //số user trong 1 trang
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
