import React from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/styles';
import clsx from 'clsx';
import MaterialButton from "@material-ui/core/Button";
import {appColor, mainColor} from "../../config";
const btnColor = appColor.button.color;
const Button = ({color, fullwidth, className, variant, children, ...rest}) => {
    return (
        <MaterialButton
            variant={variant}
            fullWidth={fullwidth}
            {...rest}
        >
            {children}
        </MaterialButton>
    );
};
Button.propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
    color: PropTypes.string,
    variant: PropTypes.oneOf(['contained', 'outlined']),
    fullwidth: PropTypes.bool
};
Button.defaultProps = {
    color: mainColor,
    variant: 'contained',
    fullwidth: false
};
export default Button;
