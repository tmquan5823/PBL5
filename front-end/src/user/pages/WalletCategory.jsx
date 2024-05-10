import React, { useEffect, useState, useContext } from "react";
import "./WalletCategory.css";
import PageContent from "../../shared/components/UIElements/PageContent";
import AddCategoryForm from "../components/WalletComponent/AddCategoryForm";
import { AuthContext } from "../../shared/context/auth-context";
import { useHttpClient } from "../../shared/hooks/http-hook";
import CategoriesList from "../components/WalletComponent/CategoriesList";

const WalletCategory = props => {
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [categories, setCategories] = useState([]);
    const auth = useContext(AuthContext);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const resData = await sendRequest(process.env.REACT_APP_URL + "/api/user/wallet/" + auth.wallet.id, "GET", null, {
                    'Authorization': "Bearer " + auth.token
                });
                if (resData.state) {
                    setCategories(resData.categories);
                }
            } catch (err) {
                console.log(err);
            }
        }
        fetchData();
    }, []);

    return <PageContent title="Danh mục ví">
        <AddCategoryForm />
        <CategoriesList
            title="Các danh mục thu nhập"
            items={categories.filter(category => category.income == true)}
        />
        <CategoriesList
            title="Các danh mục chi tiêu"
            items={categories.filter(category => category.income == false)}
        />
    </PageContent>
};

export default WalletCategory;