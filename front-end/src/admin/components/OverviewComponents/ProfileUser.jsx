import React from "react";
import { Link, useParams } from "react-router-dom";
import PageContent from "../../../shared/components/UIElements/PageContent";
import "./ProfileUser.css";
import { Form, Input } from "antd";

const ProfileUser = () => {
  const { id } = useParams();

  return (
    <PageContent title="Hồ sơ người dùng">
      <hr></hr>
      <div className="containerPf">
        <hr></hr>
        <div className="bodyPf_start">
          <img src="https://chiemtaimobile.vn/images/companies/1/%E1%BA%A2nh%20Blog/avatar-facebook-dep/Anh-avatar-hoat-hinh-de-thuong-xinh-xan.jpg?1704788263223"></img>
          <div className="informationPf">
            <div className="bodyPf_start1">
              <Form.Item label="Tên">
                <Input id="first_name" value={id} readOnly />
              </Form.Item>
              <Form.Item label="Họ">
                <Input id="last_name" value={id} readOnly />
              </Form.Item>
            </div>
            <Form.Item label="Tên hiển thị">
              <Input id="name" value={id} readOnly />
            </Form.Item>
          </div>
        </div>
        <hr></hr>
        <div className="bodyPf_end">
          <div className="bodyPf_end1">
            <Form.Item label="Email">
              <Input id="email" value={id} readOnly />
            </Form.Item>
            <Form.Item label="Số điện thoại">
              <Input id="phone" value={id} readOnly />
            </Form.Item>
          </div>
          <Form.Item label="Địa chỉ">
            <Input id="address" value={id} readOnly />
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
