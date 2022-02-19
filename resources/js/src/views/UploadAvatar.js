import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {makeStyles} from '@material-ui/styles';
import {Avatar} from '@material-ui/core';
import Grid from "@material-ui/core/Grid";
import Button from "../components/Button";
import {notificationTypes} from "../config";
import {addNotification} from "../store/notification/actions";
import {refreshUser} from "../store/auth/actions";
import {removeAvatar, saveAvatar} from "../store/profile/actions";
const useStyles = makeStyles(theme => ({
    fileInput: {
        display: 'none'
    },
    avatar: {
        height: 150,
        width: 150,
        cursor: 'pointer'
    },
    removeButton: {},
}));
const UploadAvatar = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const fileInputRef = React.useRef(null);
    const {auth_user} = useSelector(state => state.users)
    const [avatar, setAvatar] = useState(auth_user.profile_pic);
    useEffect(() => {
        setAvatar(auth_user.profile_pic  || '');
    }, [auth_user]);
    const avatarClickHandler = () => {
        fileInputRef.current.click();
    };
    const removeAvatarClickHandler = () => {
        dispatch(removeAvatar({id : auth_user.id})).then(({response}) => {
            if (response && response.data && response.data.user) {
                setAvatar(null);
                const updatedData = {...user, ...response.data.user};
                dispatch(refreshUser(updatedData));
            }
            if (response.status){
                dispatch(addNotification({
                    message:  'Remove Successfully',
                    type: notificationTypes.SUCCESS,
                }));
            }
            else {
                dispatch(addNotification({
                    message:  'Network Error',
                    type: notificationTypes.ERROR,
                }));
            }
        });
    };
    const handleAvatarUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const formData = new FormData();
        formData.append('file', file);
        dispatch(saveAvatar(formData)).then(({response}) => {
            if (response && response.data && response.data.user) {
                setAvatar(response.data.user.profile_pic);
                const updatedData = {...user, ...response.data.user};
                dispatch(refreshUser(updatedData));
                dispatch(addNotification({
                    message: 'Saved',
                    type: notificationTypes.SUCCESS,
                }));
            }
        })
    };
    const imgUploadError = (e) => {
        setAvatar(null);
    };
    return (
        <Grid container spacing={2} direction={'column'} alignItems={'center'}>
            <Grid item lg={12} md={12} sm={12}>
                <input
                    accept='image/*'
                    className={classes.fileInput}
                    onChange={handleAvatarUpload}
                    ref={fileInputRef}
                    type="file"
                />
            </Grid>
            <Grid item lg={12} md={12} sm={12}>
                <Avatar
                    className={classes.avatar}
                    imgProps={{
                        onError: imgUploadError
                    }}
                    onClick={avatarClickHandler}
                    src={avatar || '/images/no-avatar.png'}
                >
                </Avatar>
            </Grid>
            <Grid item lg={12} md={12} sm={12}>
                <Button
                    fullwidth
                    className={classes.removeButton}
                    disabled={!auth_user.profile_pic}
                    onClick={removeAvatarClickHandler}
                >
                    Remove picture
                </Button>
            </Grid>
        </Grid>
    );
};
export default UploadAvatar;
