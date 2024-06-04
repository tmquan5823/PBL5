import React, { useState, useContext, useEffect } from "react";
import "./WalletContainer.css";
import Wallet from "./Wallet";
import Modal from "../../../shared/components/UIElements/Modal";
import AddWallet from "./AddWallet";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import { AuthContext } from "../../../shared/context/auth-context";
import { useHttpClient } from "../../../shared/hooks/http-hook";
import LoadingSpinner from "../../../shared/components/UIElements/LoadingSpinner";

const WalletContainer = props => {
    const [showForm, setShowForm] = useState();
    const auth = useContext(AuthContext);
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [wallets, setWallets] = useState(props.wallets);

    function closeHandler() {
        setShowForm(false);
    }

    function showFormHandler(event) {
        event.preventDefault();
        setShowForm(true);
    }

    function onCickHandler(id) {
        auth.setWallet(wallets.find(wallet => wallet.id === id));
    }

    const handleWalletAdded = (newWallet) => {
        props.onAddWallet(newWallet);
        setWallets(prevWallets => [...prevWallets, newWallet]);
    }

    useEffect(() => {
        setWallets(props.wallets)
    }, [props.wallets]);

    return <React.Fragment>
        <Modal
            show={showForm}
            onCancel={closeHandler}
            width="50%"

        >
            <AddWallet onClose={closeHandler} onWalletAdded={handleWalletAdded} />
        </Modal>
        <div className="user-wallet">
            <h2>Ví</h2>
            <div className="wallet-container">
                <div className="add-wallet-card">
                    <p>Thêm ví mới để nâng cao hiệu quả quán lí chi tiêu!</p>
                    <button onClick={showFormHandler}>Thêm ví mới</button>
                </div>
                {wallets && wallets.map(item => (
                    <NavLink key={item.id} onClick={() => { onCickHandler(item.id) }} to={`/user/wallet/${item.id}`}>
                        <Wallet
                            name={item.walletName}
                            money={item.moneyLeft}
                        />
                    </NavLink>
                ))}
            </div>
        </div>
    </React.Fragment>
};

export default WalletContainer;