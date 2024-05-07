import React, { useState, useContext } from "react";
import "./WalletContainer.css";
import Wallet from "./Wallet";
import Modal from "../../../shared/components/UIElements/Modal";
import AddWallet from "./AddWallet";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import { AuthContext } from "../../../shared/context/auth-context";

const WalletContainer = props => {
    const [showForm, setShowForm] = useState();
    const auth = useContext(AuthContext);

    function closeHandler() {
        setShowForm(false);
    }

    function showFormHandler(event) {
        event.preventDefault();
        setShowForm(true);
    }

    function onCickHandler(id) {
        auth.setWallet(id);
    }

    return <React.Fragment>
        <Modal
            show={showForm}
            onCancel={closeHandler}
            width="50%"

        >
            <AddWallet />
        </Modal>
        <div className="user-wallet">
            <h2>Ví</h2>
            <div className="wallet-container">
                <div className="add-wallet-card">
                    <p>Thêm ví mới để nâng cao hiệu quả quán lí chi tiêu!</p>
                    <button onClick={showFormHandler}>Thêm ví mới</button>
                </div>
                {props.items.map(item => (
                    <NavLink onClick={() => { onCickHandler(item.id) }} to={`/user/wallet/${item.id}`}>
                        <Wallet
                            key={item.id}
                            name={item.name}
                            money={item.money}
                        />
                    </NavLink>
                ))}
            </div>
        </div>
    </React.Fragment>
};

export default WalletContainer;