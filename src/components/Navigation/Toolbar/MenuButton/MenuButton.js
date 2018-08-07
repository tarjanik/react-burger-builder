import React from 'react';
import classes from './MenuButton.css';
import PropTypes from 'prop-types';

const menuButton = (props)=>(
    <div className={classes.DrawerToggle} onClick={props.clicked}>
        <div></div>
        <div></div>
        <div></div>
    </div>
);

menuButton.propTypes = {
    clicked: PropTypes.func.isRequired
}

export default menuButton;