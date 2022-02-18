import React from 'react';
import PropTypes from 'prop-types';
import {Checkbox as MaterialCheckBox} from "@material-ui/core";
import {mainColor} from "../../config";


const CheckBox = ({color, className, children, ...rest}) => {

    return (
        <MaterialCheckBox

            style={{color: color}}
            {...rest}
        >
            {children}
        </MaterialCheckBox>
    );
};
CheckBox.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    color: PropTypes.string,
};
CheckBox.defaultProps = {
    color: mainColor,
};
export default CheckBox;
