import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import PageContent from "../../../shared/components/UIElements/PageContent";
import { Form, Input } from "antd";
import { useHttpClient } from "../../../shared/hooks/http-hook";
import { AuthContext } from "../../../shared/context/auth-context";
import LoadingSpinner from "../../../shared/components/UIElements/LoadingSpinner";
import "./ProfileUser.css";

const ProfileUser = () => {
  const { id } = useParams();
  const auth = useContext(AuthContext);
  const { isLoading, sendRequest } = useHttpClient();
  const [userData, setUserData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    date_of_birth: "",
    phone_num: "",
    address: "",
    avatar_url: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_URL}/api/admin/user/${id}`,
          "GET",
          null,
          {
            "Content-Type": "application/json",
            Authorization: "Bearer " + auth.token,
          }
        );
        setUserData({
          first_name: responseData.first_name || "",
          last_name: responseData.last_name || "",
          email: responseData.email || "",
          date_of_birth: responseData.date_of_birth || "",
          phone_num: responseData.phone_num || "",
          address: responseData.address || "",
          avatar_url: responseData.avatar_url || "",
        });
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [sendRequest, id, auth.token]);

  if (isLoading) {
    return <LoadingSpinner asOverlay />;
  }

  return (
    <PageContent title="Hồ sơ người dùng">
      <div className="containerPf">
        <hr></hr>
        <div className="bodyPf_start">
          <img src={userData.avatar_url} alt="User Avatar" />
          <div className="informationPf">
            <div className="bodyPf_start1">
              <Form.Item label="Họ">
                <Input id="first_name" value={userData.first_name} readOnly />
              </Form.Item>
              <Form.Item label="Tên">
                <Input id="last_name" value={userData.last_name} readOnly />
              </Form.Item>
            </div>
            <Form.Item label="Email">
              <Input id="email" value={userData.email} readOnly />
            </Form.Item>
          </div>
        </div>
        <hr></hr>
        <div className="bodyPf_end">
          <div className="bodyPf_end1">
            <Form.Item label="Ngày sinh">
              <Input
                id="date_of_birth"
                type="datetime-local"
                value={userData.date_of_birth}
                readOnly
              />
            </Form.Item>
            <Form.Item label="Số điện thoại">
              <Input id="phone_num" value={userData.phone_num} readOnly />
            </Form.Item>
          </div>
          <Form.Item label="Địa chỉ">
            <Input id="address" value={userData.address} readOnly />
          </Form.Item>
        </div>
        <Link id="linkUs" to="/admin/overview">
          Quay lại
        </Link>
      </div>
    </PageContent>
  );
};

export default ProfileUser;
