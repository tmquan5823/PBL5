import React, { useContext, useEffect } from "react";
import "./NotificationItem.css";
import { formatArrayDate } from "../../help/DateFormat";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useHttpClient } from "../../hooks/http-hook";
import { AuthContext } from "../../context/auth-context";

const NotificationItem = props => {
    const auth = useContext(AuthContext);
    const history = useHistory();
    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    var object = (JSON.parse(props.item.object));
    useEffect(() => {
        object = (JSON.parse(props.item.object));
    }, [props.item]);

    async function clickHandler() {
        if (!props.item.read) {
            try {
                await sendRequest(process.env.REACT_APP_URL + '/api/notification/read/' + props.item.id, 'PATCH', null,
                    {
                        "Content-Type": 'application/json',
                        'Authorization': "Bearer " + auth.token
                    });
            } catch (err) {
                console.log(err)
            }
        }
        if (props.item.notificationType === 'TRANSACTION') {
            try {
                const resData = await sendRequest(process.env.REACT_APP_URL + '/api/user/wallet/' + object.wallet.id, 'GET', null,
                    {
                        'Authorization': "Bearer " + auth.token
                    });
                if (resData.state) {
                    auth.setWallet(object.wallet);
                    history.push("/user/transaction");
                }
                else {
                    auth.setWallet(null);
                    history.push("/user/transaction");
                }
            } catch (err) {
                console.log(err)
            }
        }
        if (props.item.notificationType === 'BUDGET') {
            auth.setWallet();
            history.push("/user/budget/" + object.id);
        }
    }

    return <React.Fragment>
        {props.item && <div className="notification-item" onClick={clickHandler}>
            <div
                className={`notification-item__image 
            ${props.item.notificationType === 'TRANSACTION' && 'notification-item__image-transaction '}`}
                style={{
                    backgroundColor: props.item.notificationType === 'TRANSACTION' && object.transaction.category.iconColor
                }}
            >
                <img src={`${props.item.notificationType === 'BUDGET' ? '/images/budgeting.png' : ""}${props.item.notificationType === 'TRANSACTION' ? object.transaction.category.iconUrl : ""}${props.item.notificationType === 'CHAT' ? '/images/chat.png' : ""}`} alt="" />
            </div>
            <div className={`notification-item__content ${props.item.read && 'notification-item__read-content'}`}>
                <span span className="main-content">
                    {props.item.content}
                </span>
                <span className="date">
                    {formatArrayDate(props.item.timeStamp)}
                </span>
            </div>
        </div >}
    </React.Fragment>
};

export default NotificationItem;