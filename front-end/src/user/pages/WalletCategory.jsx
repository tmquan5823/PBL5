import React from "react";
import "./WalletCategory.css";
import PageContent from "../../shared/components/UIElements/PageContent";
import AddCategoryForm from "../components/WalletComponent/AddCategoryForm";

const WalletCategory = props => {
    return <PageContent title="Danh mục ví">
        <AddCategoryForm />
    </PageContent>
};

export default WalletCategory;