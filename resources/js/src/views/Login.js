import React, {useEffect, useState} from 'react';
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import {useDispatch} from "react-redux";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import {Visibility, VisibilityOff} from '@material-ui/icons';
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Typography from "@material-ui/core/Typography";
import validate from "validate.js";
import {login} from "../store/auth/actions";
import {addNotification} from "../store/notification/actions";
import {TextField} from "../components/TextField";
import Button from "../components/Button";
import CheckBox from "../components/CheckBox";
import {Link} from "react-router-dom";
import {mainColor, notificationTypes} from "../config";
function Login() {
    const dispatch = useDispatch();
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
        }
    };
    const [formState, setFormState] = useState({
        showPassword: false,
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
    const handleSubmit = async event => {
        event.preventDefault();
        if (!formState.isValid) {
            return;
        }
        dispatch(login({...formState.values, remember: formState.remember})).then(({response}) => {
            if (response && response.data && response.data.user) {
                const {user} = response.data;
                history.push('/dashboard');
            }
        }).catch((error) => {
            dispatch(addNotification({
                message: error.response ? error.response.data.message : 'Unauthorized',
                type: notificationTypes.ERROR,
            }));
        });
    };
    return (
        <Grid >
            <Grid align={'center'}>
                <Paper style={{
                    padding: 30,
                    height: '70vh',
                    width: 350,
                    margin: '20px auto',
                }} elevation={10}>
                    <Avatar style={{
                        'background-color': mainColor
                    }}><LockOutlinedIcon/></Avatar>
                    <h2>Sign In</h2>
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
                        <Grid container direction={'row'} spacing={1} justify={'space-between'} alignItems={'center'}>
                            <Grid item>
                                <FormControlLabel
                                    control={
                                        <CheckBox checked={formState.remember} onChange={handleRemember}
                                                  value="antoine"/>
                                    }
                                    label={<Typography>Remember Me</Typography>}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Button
                            fullwidth={true}
                            variant={'contained'}
                            onClick={handleSubmit}
                        >
                            Login
                        </Button>
                    </Grid>
                    <hr/>
                    <Grid>
                        <Typography>Don't have Account ?</Typography>
                    </Grid>
                    <Grid item>
                        <Button
                            fullwidth={true}
                            style={{textDecoration: 'none'}}
                        >
                            <Link to={'/register'}>
                                Register
                            </Link>
                        </Button>
                    </Grid>




                </Paper>
            </Grid>
        </Grid>
    );
}
export default Login;
