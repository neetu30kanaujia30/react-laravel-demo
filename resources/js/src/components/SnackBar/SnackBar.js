import React from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/styles';
import MaterialSnackbar from "@material-ui/core/Snackbar";
import MaterialSnackBarContent from "@material-ui/core/SnackbarContent";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import InfoIcon from '@material-ui/icons/Info';
import WarningIcon from '@material-ui/icons/Warning';
import BlockIcon from '@material-ui/icons/Block';

const useStyles = makeStyles(theme => ({
    content: {},
    message: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        justifyItems: 'space-evenly',
    },
}));
const variantIcon = {
    success: CheckCircleIcon,
    warning: WarningIcon,
    // error: ErrorIcon,
    error: BlockIcon,
    info: InfoIcon,
};
const variantColor = {
    success: '#21bf73',
    warning: '#ffa931',
    error: '#c70039',
    info: '#40bad5',
};
const SnackBar = props => {
    const {open, onClose, message, variant, autoHideDuration, vertical, horizontal, ...others} = props;
    const classes = useStyles();
    const Icon = variantIcon[variant];
    const bgColor = variantColor[variant];
    return (
        <MaterialSnackbar
            anchorOrigin={{
                vertical: vertical,
                horizontal: horizontal
            }}
            autoHideDuration={autoHideDuration}
            onClose={onClose}
            open={open}
        >
            <MaterialSnackBarContent
                style={{backgroundColor: bgColor}}
                message={
                    <div id="client-snackbar" className={classes.message}>
                        <Icon style={{marginRight: '5px'}}/>
                        {message}
                    </div>
                }
            />
        </MaterialSnackbar>
    );
};
SnackBar.propTypes = {
    message: PropTypes.string,
    onClose: PropTypes.func,
    autoHideDuration: PropTypes.number,
    open: PropTypes.bool,
    variant: PropTypes.oneOf(['error', 'warning', 'info', 'success']),
    vertical: PropTypes.oneOf(['top', 'bottom']),
    horizontal: PropTypes.oneOf(['left', 'center', 'right']),
};
SnackBar.defaultProps = {
    open: true,
    message: '',
    autoHideDuration: 3000,
    vertical: 'top',
    horizontal: 'left',
    variant: 'info'
};
export default SnackBar;
