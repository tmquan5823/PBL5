import React, { useEffect, useState } from "react";
import "./UserItem.css";
import axios from "axios";

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

  return (
    <div className="user-item">
      <div className="adForm">
        <table className="adTbl">
          <thead>
            <tr>
              <th id="idAd">ID</th>
              <th id="dateAd">Ngày</th>
              <th id="nameAd">Tên</th>
              <th id="emailAd">Email</th>
              <th id="statusAd">Trạng thái</th>
              <th id="optAd">Tuỳ chọn</th>
            </tr>
          </thead>
          <tbody>
            {listUser &&
              listUser.length > 0 &&
              listUser.map((user) => {
                return (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.first_name}</td>
                    <td>{user.last_name}</td>
                    <td>{user.email}</td>
                    {/* <td>Đã khóa</td>
                            <td>
                                <button className="btnPrf">p</button>
                                <button className="btnDel">d</button>
                            </td> */}
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserItem;
