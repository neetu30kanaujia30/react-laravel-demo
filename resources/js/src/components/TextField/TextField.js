import React from 'react';
import PropTypes from 'prop-types';
import {TextField as MaterialTextField} from "@material-ui/core";
import InputAdornment from '@material-ui/core/InputAdornment';


const adornmentHandler = () => {
    console.log('Adornment clicked');
}
const Adornment = ({text}) => {
    return (
        <InputAdornment position="start" onClick={adornmentHandler}>
            {text}
        </InputAdornment>
    )
}
export const TextField = ({label, margin, variant, fullWidth, color, adornment, children, value, className, ...rest}) => {

    return (
        <MaterialTextField
            fullWidth={fullWidth}
            label={label}
            variant={variant}
            value={value}
            inputProps={{
                startAdornment: (adornment) ? <Adornment text={adornment}/> : null,
            }}
            InputLabelProps={{shrink: true}}
            {...rest}
        >
            {children}
        </MaterialTextField>
    );
};
TextField.defaultProps = {
    type: "text",
    margin: "normal",
    variant: "outlined",
    value: '',
    fullWidth: true,
    label: ''
};
TextField.propTypes = {
    children: PropTypes.node,
    color: PropTypes.oneOf(['primary', 'secondary']),
    className: PropTypes.string,
    value: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    helperText: PropTypes.string,
    label: PropTypes.string.isRequired,
    margin: PropTypes.oneOf(['dense', 'none', 'normal']),
    type: PropTypes.oneOf(['number', 'text', 'date', 'time', 'email']),
    variant: PropTypes.oneOf(['filled', 'outlined', 'standard']),
    fullWidth: PropTypes.oneOf([true, false]),
};
Adornment.propTypes = {
    text: PropTypes.string,
    color: 'primary',
    fullWidth: PropTypes.bool
}
// export default TextField;
