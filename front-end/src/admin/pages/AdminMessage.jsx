import React from "react";
import "./AdminMessage.css";
import PageContent from "../../shared/components/UIElements/PageContent";
import ChatAdmin from "../components/ChatAdmin/ChatAdmin";

const AdminMessage = (props) => {
  return (
    <PageContent
      overflow="hidden"
      title="Nhắn tin"
      nopadding>
      <ChatAdmin />
    </PageContent>
  );
};

export default AdminMessage;
