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
    const [wallets, setWallets] = useState();

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
        setWallets(prevWallets => [...prevWallets, newWallet]);
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const resData = await sendRequest(process.env.REACT_APP_URL + '/api/user/all-wallets', 'GET', null,
                    {
                        'Authorization': "Bearer " + auth.token
                    }
                )
                if (resData.state) {
                    setWallets(resData.list_wallet);
                }
            } catch (err) {
                console.log(err);
            }
        }
        fetchData();
    }, []);

    return <React.Fragment>
        {isLoading && <LoadingSpinner asOverlay />}
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
                    <NavLink onClick={() => { onCickHandler(item.id) }} to={`/user/wallet/${item.id}`}>
                        <Wallet
                            key={item.id}
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