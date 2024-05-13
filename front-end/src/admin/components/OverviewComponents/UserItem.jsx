import React, { useState, useEffect } from "react";
import { Table, Button } from "antd";
import axios from "axios";
import {} from '@ant-design/icon'

const UserItem = (props) => {
  const [listUser, setListUser] = useState([]);
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

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
  axios.get("https://jsonplaceholder.typicode.com/todos")
    .then(response => {
      setListUser(response.data);
    })
    .catch(error => {
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
      sorter:(record1, record2)=>{
        return record1.id > record2.id
      }
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
      align: "left",
    },
    {
      title: "Name",
      dataIndex: "title",
      key: "title",
      align: "left",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      align: "left",
    },
    {
      title: "Trạng thái",
      dataIndex: "completed",
      key: "completed",
      align: "left",
      render: (completed) => {
        return <p>{completed ? 'True' : 'False'}</p>
      },
      filters:[
        {text:'True', value: true},
        {text:'False', value: false}
      ],
      onFilter:(value, record)=>{
        return record.completed === value
      }  
    },
    {
      title: "Tuỳ chọn",
      key: "action",
      align: "left",
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
        <Table 
        dataSource={listUser} 
        columns={columns} 
        pagination={{
          current: page, //trang hiển thị đầu tiên khi truy cập
          pageSize: pageSize, //số user trong 1 trang
          onChange: (page, pageSize) => {
            setPage(page);
            setPageSize(pageSize);
          }
        }}
        />
      </div>
    </div>
  );
};

export default UserItem;
