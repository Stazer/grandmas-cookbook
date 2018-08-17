import React from 'react';
import PropTypes from 'prop-types';
import {Navbar, NavbarBrand} from 'reactstrap';

class Header extends React.Component {
    render() {
        return (
            <Navbar color="light" light>
              <NavbarBrand href="#">Grandmas Cookbook</NavbarBrand>
            </Navbar>
        );
    }
}

export default Header;
