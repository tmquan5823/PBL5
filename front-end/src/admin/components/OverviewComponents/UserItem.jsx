import React, { useState, useEffect, useContext } from "react";
import { Table, Button, Input, Modal } from "antd";
import { useHistory } from "react-router-dom";
import "./UserItem.css";
import { SearchOutlined, LockOutlined, UserOutlined } from "@ant-design/icons";
import { AuthContext } from "../../../shared/context/auth-context";
import { useHttpClient } from "../../../shared/hooks/http-hook";
import {
  successNotification,
  errorNotification,
  warningNotification,
} from "../../../shared/components/UIElements/Warning";

const UserItem = (props) => {
  const [listUser, setListUser] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const auth = useContext(AuthContext);
  const { isLoading, sendRequest } = useHttpClient();
  const history = useHistory();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    // const fetchData = async () => {
    //   try {
    //     const responseData = await sendRequest(
    //       `${process.env.REACT_APP_URL}/api/admin/users`,
    //       "GET",
    //       null,
    //       {
    //         "Content-Type": "application/json",
    //         Authorization: "Bearer " + auth.token,
    //       }
    //     );
    //     if (Array.isArray(responseData.list_user)) {
    //       setListUser(responseData.list_user);
    //     } else {
    //       console.error("Response data is not an array", responseData);
    //       setListUser([]);
    //     }
    //   } catch (err) {
    //     console.log(err);
    //     setListUser([]);
    //   }
    // };
    // fetchData();

    getListUser();
  }, [sendRequest, auth.token, props.id]);

  // const handleToggleCompleted = () => {
  //   if (selectedUser) {
  //     const updatedListUser = listUser.map((user) =>
  //       user.id === selectedUser.id ? { ...user, status: !user.status } : user
  //     );
  //     setListUser(updatedListUser);
  //   }
  //   setIsModalVisible(false);
  // };

  const getListUser = () => {
    const fetchData = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_URL}/api/admin/users`,
          "GET",
          null,
          {
            "Content-Type": "application/json",
            Authorization: "Bearer " + auth.token,
          }
        );

        if (Array.isArray(responseData.list_user)) {
          setListUser(responseData.list_user);
        } else {
          console.error("Response data is not an array", responseData);
          setListUser([]);
        }
      } catch (err) {
        console.log(err);
        setListUser([]);
      }
    };

    fetchData();
  };

  const handleViewProfile = (record) => {
    history.push(`/admin/overview/${record.id}`);
  };

  const showModal = (record) => {
    setSelectedUser(record);
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    if (selectedUser) {
      try {
        const resData = await sendRequest(
          `${process.env.REACT_APP_URL}/api/admin/user/${selectedUser.id}`,
          "PUT",
          {},
          {
            "Content-Type": "application/json",
            Authorization: "Bearer " + auth.token,
          }
        );
        console.log(resData);
        if (resData) {
          getListUser();
          successNotification(resData.message);
        }
      } catch (error) {
        errorNotification("Lỗi khi cập nhật trạng thái:", error);
      } finally {
        setIsModalVisible(false);
      }
    } else {
      setIsModalVisible(false);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
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
      onFilter: (value, record) => record.phone.includes(value),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
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
            onPressEnter={confirm}
            onBlur={confirm}
            style={{ marginBottom: 8, display: "block" }}
          />
          <Button
            onClick={confirm}
            icon={<SearchOutlined />}
            size="small"
            style={{ marginRight: 8, width: 90 }}
            type="primary"
          >
            Search
          </Button>
          <Button
            onClick={clearFilters}
            size="small"
            style={{ marginRight: 8, width: 90 }}
          >
            Reset
          </Button>
          <Button type="link" size="small" onClick={close}>
            close
          </Button>
        </div>
      ),
      filterIcon: (filtered) => (
        <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
      ),
      onFilter: (value, record) =>
        record.name.toLowerCase().includes(value.toLowerCase()),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
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
            onPressEnter={confirm}
            onBlur={confirm}
            style={{ marginBottom: 8, display: "block" }}
          />
          <Button
            onClick={confirm}
            icon={<SearchOutlined />}
            size="small"
            style={{ marginRight: 8, width: 90 }}
            type="primary"
          >
            Search
          </Button>
          <Button
            onClick={clearFilters}
            size="small"
            style={{ marginRight: 8, width: 90 }}
          >
            Reset
          </Button>
          <Button type="link" size="small" onClick={close}>
            close
          </Button>
        </div>
      ),
      filterIcon: (filtered) => (
        <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
      ),
      onFilter: (value, record) =>
        record.email.toLowerCase().includes(value.toLowerCase()),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      align: "left",
      render: (status) => <p>{status ? "Đã khóa" : "Chưa khóa"}</p>,
      filters: [
        { text: "Đã khóa", value: true },
        { text: "Chưa khóa", value: false },
      ],
      onFilter: (value, record) => record.status === value,
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
          <Button className="btnDel" onClick={() => showModal(record)}>
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
            pageSize: 6,
            onChange: (page, pageSize) => {
              setPage(page);
              setPageSize(pageSize);
            },
          }}
        />
      </div>
      <Modal
        title={
          "Bạn có muốn " +
          (selectedUser ? (selectedUser.status ? "mở" : "khóa") : "") +
          " tài khoản này không ?"
        }
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <label>{selectedUser ? selectedUser.email : ""}</label>
      </Modal>
    </div>
  );
};

export default UserItem;
