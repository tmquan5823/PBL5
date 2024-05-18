import { message } from "antd";

export const successNotification = (message1) => {
    message.success(message1);
};

export const errorNotification = (message1) => {
    message.error(message1);
};

export const warningNotification = (message1) => {
    message.warning(message1);
};