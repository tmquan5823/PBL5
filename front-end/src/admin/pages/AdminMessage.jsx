import React from "react";
import "./AdminMessage.css";
import PageContent from "../../shared/components/UIElements/PageContent";
import ChatAdmin from "../components/ChatAdmin/ChatAdmin";

const AdminMessage = (props) => {
  return (
    <PageContent title="Nhắn tin">
      <ChatAdmin />
    </PageContent>
  );
};

export default AdminMessage;
