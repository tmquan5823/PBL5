import React, { useEffect, useState, useContext } from "react";
import "./WalletCategory.css";
import PageContent from "../../shared/components/UIElements/PageContent";
import AddCategoryForm from "../components/CategoryComponent/AddCategoryForm";
import { AuthContext } from "../../shared/context/auth-context";
import { useHttpClient } from "../../shared/hooks/http-hook";
import CategoriesList from "../components/CategoryComponent/CategoriesList";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

const WalletCategory = props => {
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [categories, setCategories] = useState([]);
    const auth = useContext(AuthContext);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const resData = await sendRequest(process.env.REACT_APP_URL + "/api/user/categories", "GET", null, {
                    'Authorization': "Bearer " + auth.token
                });
                if (resData.state) {
                    setCategories(resData.list_categories);
                }
            } catch (err) {
                console.log(err);
            }
        }
        fetchData();
    }, []);

    function onAddNewCategory(item) {
        console.log(item);
        setCategories(preValue => { return [...preValue, item] })
    }

    return <React.Fragment>
        {isLoading && <LoadingSpinner asOverlay />}
        <PageContent title="Danh mục ví">
            <AddCategoryForm
                onAdd={onAddNewCategory}
            />
            <CategoriesList
                title="Các danh mục thu nhập"
                items={categories.filter(category => category.category.income == true)}
                type='income'
            />
            <CategoriesList
                title="Các danh mục chi tiêu"
                items={categories.filter(category => category.category.income == false)}
                type='outcome'
            />
        </PageContent>
    </React.Fragment>
};

export default WalletCategory;