import React, {useEffect, useState} from 'react';
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import {useDispatch} from "react-redux";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import {Visibility, VisibilityOff} from '@material-ui/icons';
import validate from "validate.js";
import {register} from "../store/auth/actions";
import {addNotification} from "../store/notification/actions";
import {TextField} from "../components/TextField";
import Button from "../components/Button";
import {mainColor, notificationTypes} from "../config";
import Typography from "@material-ui/core/Typography";
import {Link} from "react-router-dom";
import { useHistory } from "react-router-dom";
function SignUp() {
    const dispatch = useDispatch();
    const  history = useHistory();
    const schema = {
        email: {
            presence: {allowEmpty: false, message: 'is required'},
            email: true
        },
        password: {
            presence: {allowEmpty: false, message: 'is required'},
            length: {
                minimum: 8,
                message: 'is required size minimum 8'
            },
        },
        confirm_password: {
            presence: {allowEmpty: false, message: 'is required'},
            length: {
                minimum: 8,
                message: 'is required size minimum 8'
            },
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
    const hasError = field =>
        !!(formState.touched[field] && formState.errors[field]);
    const handleClickShowPassword = () => {
        setFormState({...formState, showPassword: !formState.showPassword});
    };
    const handleMouseDownPassword = event => {
        event.preventDefault();
    };
    const handleRemember = event => {
        event.preventDefault();
        setFormState({...formState, remember: !formState.remember})
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
                    setTimeout(function () {
                        history.push('/');
                    }, 3000);
                }
            }
        ).catch(({error}) => {
            dispatch(addNotification({
                message: error.response ? error.response.data.errors.email : 'Network Error',
                type: notificationTypes.ERROR,
            }));
        });
    };
    return (
        <Grid>
            <Grid align={'center'}>
                <Paper style={{
                    padding: 30,
                    height: '90vh',
                    width: 320,
                    margin: '20px auto',
                }} elevation={10}>
                    <Avatar style={{
                        'background-color': mainColor
                    }}><LockOutlinedIcon/></Avatar>
                    <h2>Sign Up</h2>
                    <Grid item>
                        <TextField autoComplete="off"
                                   error={hasError('name')}
                                   fullWidth
                                   helperText={hasError('name') ? formState.errors.name[0] : ' '}
                                   placeholder="Name"
                                   name="name"
                                   type="name"
                                   onChange={handleChange}
                                   value={formState.values.name || ''}/>
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
                    <Grid item>
                        <Button
                            fullwidth={true}
                            onClick={handleSubmit}
                            disabled={!formState.isValid}
                        >
                            Register
                        </Button>
                    </Grid>
                    <hr/>
                    <Grid>
                        <Typography>Already have a account</Typography>
                    </Grid>
                    <Grid item>
                        <Button
                            fullwidth={true}
                            fullwidth={true}
                            style={{textDecoration: 'none'}}
                        >
                            <Link to={'/'}>
                                Login
                            </Link>
                        </Button>
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
    );
}
export default SignUp;
