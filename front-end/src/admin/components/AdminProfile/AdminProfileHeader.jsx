import React, { useContext, useRef, useState, useEffect } from "react";
import "./AdminProfileHeader.css";
import { AuthContext } from "../../../shared/context/auth-context";
import { useForm } from "../../../shared/hooks/form-hook";
import { useHttpClient } from "../../../shared/hooks/http-hook";
import axios from "axios"
import LoadingSpinner from "../../../shared/components/UIElements/LoadingSpinner";

const AdminProfileHeader = props => {
    const [file, setFile] = useState();
    const [previewURL, setPreviewURL] = useState();
    const [isValid, setIsValid] = useState(false);
    const filePickerRef = useRef();
    const auth = useContext(AuthContext);
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [formState, inputHandler, setFormData] = useForm({
        image: {
            value: auth.avatarURL,
            isValid: true
        }
    }, true);

    async function updateAvatar() {
        try {
            const formData = new FormData();
            formData.append('image', file);
            const resData = await sendRequest(process.env.REACT_APP_URL + '/api/user/avatar', 'PUT', formData, {
                'Content-Type': 'multipart/form-data',
                'Authorization': "Bearer " + auth.token
            });
            console.log(resData);
            auth.updateAvt(resData.avatar);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        if (!file) {
            return;
        }
        const fileReader = new FileReader();
        fileReader.onload = () => {
            setPreviewURL(fileReader.result);
        }
        fileReader.readAsDataURL(file);
        updateAvatar();
    }, [file]);


    const pickedHandler = event => {
        let pickedFile;
        let fileIsValid = isValid;
        if (event.target.files || event.target.files.length === 1) {
            pickedFile = event.target.files[0];
            setFile(pickedFile);
            console.log(pickedFile);
            setIsValid(true);
            fileIsValid = true;
        } else {
            setIsValid(false);
            fileIsValid = false;
        }
        inputHandler('image', pickedFile, fileIsValid);
    }

    const pickImageHandler = async () => {
        filePickerRef.current.click();
    }

    async function deleteAvtHandler() {
        try {
            const formData = new FormData();
            formData.append('image', file);
            const resData = await sendRequest(process.env.REACT_APP_URL + '/api/user/avatar', 'DELETE', null, {
                'Authorization': "Bearer " + auth.token
            });
            if (resData.state) {
                setPreviewURL(resData.avatar);
                auth.updateAvt(resData.avatar);
            }
        } catch (err) {
            console.log(err);
        }
    }

    return <React.Fragment>
        {isLoading && <LoadingSpinner asOverlay />}
        <div className="user-profile-header">
            <input
                id="image"
                ref={filePickerRef}
                style={{ display: "none" }}
                type="file"
                accept=".jpg, .png, .jpeg"
                onChange={pickedHandler}
            />
            <div className="user-avatar">
                <img src={previewURL || auth.avatarURL} alt="" />
            </div>
            <div className="avatar-btn__container">
                <button onClick={pickImageHandler} className="new-avatar__btn">Tải ảnh mới</button>
                <button onClick={deleteAvtHandler} className="delete-avatar__btn">Xóa ảnh</button>
            </div>
        </div>
    </React.Fragment>
};

export default AdminProfileHeader;