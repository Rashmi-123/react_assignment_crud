import React, { Component } from 'react';
import {Nav,Navbar, Form, Button, FormGroup} from 'react-bootstrap';
import { withRouter } from 'react-router';
import './Header.css';
import { NavLink } from 'react-router-dom';
import logo from '../../assests/images/admin.png';
import { Label} from 'reactstrap';
import { Link } from "react-router-dom";

class HeaderComponent extends Component{

    constructor(props){
        super(props);
        this.state={
            role:{}
        }
    }

    handleLogout = (event) =>{
        event.preventDefault();
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("userName");
        sessionStorage.removeItem("userRoll");
        this.props.history.push({ pathname: '/' });
    }    
   
    render(){

        let username = sessionStorage.getItem('userName');
        let userRoll = sessionStorage.getItem('userRoll');

        return(
            <div className = "header">
                {userRoll === "administrator" ?  <Navbar collapseOnSelect expand="lg" variant="dark">
                <Navbar.Brand href="/admin/dashboard">
                    <img src={logo} width="30" height="30" className="d-inline-block align-top" alt = "logo"/>
                    </Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="mr-auto">
                             <NavLink className="childNav" to="/users"
                                activeStyle={{color : "white", }}> Users </NavLink>

                                <NavLink className="childNav" to="/CreateUsers" 
                                activeStyle={{color : "white",  }}>Create User </NavLink>

                                <Link className="childNav" to={{ 
                                        pathname: "/Roles",
                                        state: { role: this.state.role }
                                    }}>Roles</Link>

                                <NavLink className="childNav" to="/ApproveUser"
                                activeStyle={{color : "white",  }}> Approve </NavLink>

                                <NavLink className="childNav" to="/personalInfo"
                                activeStyle={{color : "white",  }}> Personal Information </NavLink>

                                <NavLink className="childNav" to="/FGDF"
                                activeStyle={{color : "white",  }}> Change User Role</NavLink>
                            </Nav>
                    <Nav>
                        <Form inline>
                            <FormGroup>
                            <Label className="labelNav">Welcome:{username}</Label>  
                            </FormGroup>       

                            <FormGroup>
                                <Label className="labelNav">Role:{userRoll}</Label>  
                            </FormGroup>    
                            <Button className="logoutButton" onClick={this.handleLogout}>Logout</Button>
                        </Form>
                    </Nav>
                </Navbar.Collapse>
                </Navbar>: null }

                {userRoll === "accessuser" ?  <Navbar collapseOnSelect expand="lg" variant="dark">
                <Navbar.Brand href="/admin/dashboard">
                    <img src={logo} width="30" height="30" className="d-inline-block align-top" alt = "logo"/>

                    </Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                            <Navbar.Collapse id="responsive-navbar-nav">
                                <Nav className="mr-auto">
                                    <NavLink className="childNav" to="/users"
                                    activeStyle={{
                                        color : "white", 
                                    }}>
                                    Users </NavLink>

                                    <NavLink className="childNav" to="/personalInfo"
                                    activeStyle={{color : "white",  }}> Personal Information </NavLink>
                                </Nav>
                                <Nav>
                                    <Form inline>
                                        <FormGroup>
                                        <Label className="labelNav">Welcome : {username}</Label>  
                                        </FormGroup>       

                                        <FormGroup>
                                            <Label className="labelNav">Role : {userRoll}</Label>  
                                        </FormGroup>    
                                        <Button className="logoutButton" onClick={this.handleLogout}>Logout</Button>
                                    </Form>
                                </Nav>
                            </Navbar.Collapse>
                        </Navbar> : null

                }

                {userRoll === "operator" ?  <Navbar collapseOnSelect expand="lg" variant="dark">
                    <Navbar.Brand href="/admin/dashboard">
                        <img src={logo} width="30" height="30" className="d-inline-block align-top" alt = "logo"/>
                        </Navbar.Brand>
                            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                            <Navbar.Collapse id="responsive-navbar-nav">
                                <Nav className="mr-auto">
                                    <NavLink className="childNav" to="/users"
                                        activeStyle={{color : "white", }}> Users </NavLink>

                                    <NavLink className="childNav" to="/CreateUsers" 
                                    activeStyle={{color : "white",  }}>Create User </NavLink>
                                    <NavLink className="childNav" to="/personalInfo"
                                    activeStyle={{color : "white",  }}> Personal Information </NavLink>
                                </Nav>
                        <Nav>
                            <Form inline>
                                <FormGroup>
                                <Label className="labelNav">Welcome : {username}</Label>  
                                </FormGroup>       

                                <FormGroup>
                                    <Label className="labelNav">Role : {userRoll}</Label>  
                                </FormGroup>    
                                <Button className="logoutButton" onClick={this.handleLogout}>Logout</Button>
                            </Form>
                        </Nav>
                    </Navbar.Collapse>
                    </Navbar> : null }
               
            </div>    
        );
    }

}

export default withRouter(HeaderComponent);