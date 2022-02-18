import React from 'react';
import PropTypes from 'prop-types';
import {Typography} from '@material-ui/core';



const PageHeader = ({title, variant, ...rest}) => {

    return (
        <Typography
            noWrap={true}
            gutterBottom
            variant={variant}
            {...rest}
        >
            {title}
        </Typography>
    );
}
PageHeader.defaultProps = {
    variant: 'h5'
};
PageHeader.propTypes = {
    title: PropTypes.string.isRequired,
    variant: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'body1', 'body2']),
};
export default PageHeader;
