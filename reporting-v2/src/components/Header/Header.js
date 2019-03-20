import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';
import Avatar from '../Avatar';
import './Header.scss';

const StyledHeader = styled.div`
  background: #fff;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 99989;
`;

class Header extends React.Component {
  state = {
    isOpen: false
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    return (
      <StyledHeader>
        <Navbar expand="md">
          <NavbarBrand href="/">LOGO</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav navbar>
              <NavItem>
                <NavLink className="nav-link" activeClassName="active" to="/reports">Anvendelsesrapporter</NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="nav-link" activeClassName="active" to="/performance">Performancerapporter</NavLink>
              </NavItem>
            </Nav>
            <Nav navbar className="ml-auto">
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav >
                  <div className="userNav">
                    <span className="pr-2">
                      Hans Hansen
                    </span>
                    <Avatar name="Hans Hansen" />
                  </div>
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                    Logout
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Navbar>
      </StyledHeader>
    )
  }
}

export default Header;
