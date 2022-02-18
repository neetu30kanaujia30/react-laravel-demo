import React, {useEffect, useState} from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from "../components/Button";
import UploadAvatar from "./UploadAvatar";
import {TextField} from "../components/TextField";
import Grid from "@material-ui/core/Grid";
import validate from "validate.js";
import Paper from "@material-ui/core/Paper";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import {Visibility, VisibilityOff} from "@material-ui/icons";
import {register} from "../store/auth/actions";
import {addNotification} from "../store/notification/actions";
import {notificationTypes} from "../config";
import {useDispatch} from "react-redux";
export default function AlertDialog() {
    const dispatch = useDispatch();
    const schema = {
        email: {
            presence: {allowEmpty: false, message: 'is required'},
            email: true
        },
        password: {
            presence: {allowEmpty: false, message: 'is required'}
        },
        confirm_password: {
            presence: {allowEmpty: false, message: 'is required'}
        },
        name: {
            presence: {allowEmpty: false, message: 'is required'}
        },
        phone: {
            presence: {allowEmpty: false, message: 'is required'},
            length: {
                maximum: 14,
                minimum: 10,
                message: 'is required size 10-14'
            },
            numericality: {
                onlyInteger: true
            },
        }
    };
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const [formState, setFormState] = useState({
        showPassword: false,
        showConfirmPassword: false,
        isValid: false,
        remember: false,
        values: {},
        touched: {},
        errors: {}
    });
    useEffect(() => {
        const errors = validate(formState.values, schema);
        setFormState(formState => ({
            ...formState,
            isValid: !errors,
            errors: errors || {}
        }));
    }, [formState.values]);
    const handleChange = event => {
        event.persist();
        setFormState(formState => ({
            ...formState,
            values: {
                ...formState.values,
                [event.target.name]:
                    event.target.type === 'checkbox'
                        ? event.target.checked
                        : event.target.value
            },
            touched: {
                ...formState.touched,
                [event.target.name]: true
            }
        }));
    };
    const handleClickShowConfirmPassword = () => {
        setFormState({...formState, showConfirmPassword: !formState.showConfirmPassword});
    };
    const handleClickShowPassword = () => {
        setFormState({...formState, showPassword: !formState.showPassword});
    };
    const handleMouseDownPassword = event => {
        event.preventDefault();
    };
    const handleSubmit = event => {
        event.preventDefault();
        if (!formState.isValid) {
            return;
        }
        dispatch(
            register({...formState.values})
        ).then((response) => {
                if (response.data && response.data.status) {
                    console.log('response', response.data.user);
                    dispatch(addNotification({
                        message: 'Registration successful!',
                        type: notificationTypes.SUCCESS,
                    }));
                    setFormState(initialState);
                }
            }
        ).catch(({error}) => {
            dispatch(addNotification({
                message: error.response ? error.response.data.errors.email : 'Network Error',
                type: notificationTypes.ERROR,
            }));
        });
    };
    const hasError = field =>
        !!(formState.touched[field] && formState.errors[field]);
    return (
        <div>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
              Add Details
            </Button>
            <Dialog
                fullWidth={true}
                maxWidth={'lg'}
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"User Details"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                       <Grid container direction={'column'} spacing={1} >
                        <Grid item>
                            <UploadAvatar />
                        </Grid>
                        <Grid item>
                            <TextField autoComplete="off"
                                       error={hasError('name')}
                                       fullWidth
                                       helperText={hasError('name') ? formState.errors.name[0] : ' '}
                                       placeholder="Name"
                                       name="name"
                                       type="name"
                                       onChange={handleChange}
                                       value={formState.values.name || ''}
                            />
                        </Grid>
                           <Grid item>
                               <TextField autoComplete="off"
                                          error={hasError('email')}
                                          fullWidth
                                          helperText={hasError('email') ? formState.errors.email[0] : ' '}
                                          placeholder="Email"
                                          name="email"
                                          type="email"
                                          onChange={handleChange}
                                          value={formState.values.email || ''}/>
                           </Grid>
                           <Grid item>
                               <TextField autoComplete="off"
                                          error={hasError('phone')}
                                          fullWidth
                                          helperText={hasError('phone') ? formState.errors.phone[0] : ' '}
                                          placeholder="Contact number"
                                          name="phone"
                                          type="text"
                                          onChange={handleChange}
                                          value={formState.values.phone || ''}/>
                           </Grid>
                           <Grid item>
                               <TextField autoComplete="off"
                                          error={hasError('password')}
                                          placeholder="Password"
                                          fullWidth
                                          helperText={
                                              hasError('password') ? formState.errors.password[0] : ' '
                                          }
                                          adornment={
                                              <InputAdornment position="end">
                                                  <IconButton
                                                      style={{padding: 'none', height: 10, width: 10, marginRight: 2}}
                                                      edge="end"
                                                      aria-label="toggle password visibility"
                                                      onClick={handleClickShowPassword}
                                                      onMouseDown={handleMouseDownPassword}
                                                  >
                                                      {formState.showPassword ? <VisibilityOff/> : <Visibility/>}
                                                  </IconButton>
                                              </InputAdornment>
                                          }
                                          name="password"
                                          onChange={handleChange}
                                          type={formState.showPassword ? 'text' : 'password'}
                                          value={formState.values.password || ''}
                               />
                           </Grid>
                           <Grid item>
                               <TextField autoComplete="off"
                                          error={hasError('confirm_password')}
                                          placeholder="Password"
                                          fullWidth
                                          helperText={
                                              hasError('confirm_password') ? formState.errors.confirm_password[0] : ' '
                                          }
                                          adornment={
                                              <InputAdornment position="end">
                                                  <IconButton
                                                      style={{padding: 'none', height: 10, width: 10, marginRight: 2}}
                                                      edge="end"
                                                      aria-label="toggle password visibility"
                                                      onClick={handleClickShowConfirmPassword}
                                                      onMouseDown={handleMouseDownPassword}
                                                  >
                                                      {formState.showConfirmPassword ? <VisibilityOff/> : <Visibility/>}
                                                  </IconButton>
                                              </InputAdornment>
                                          }
                                          name="confirm_password"
                                          onChange={handleChange}
                                          type={formState.showPassword ? 'text' : 'password'}
                                          value={formState.values.confirm_password || ''}
                               />
                           </Grid>
                        </Grid>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={handleSubmit}
                        disabled={!formState.isValid}
                    >
                        Edit
                    </Button>
                    <Button onClick={handleClose} color="primary" autoFocus>
                      Close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}