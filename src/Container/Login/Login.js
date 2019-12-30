import React, { Component } from "react";
import { Card, Form, FormGroup,Label } from "reactstrap";
import "./Login.css";
import InputElement from "../../Component/Shared/Input/Input";
import ButtonElment from "../../Component/Shared/Button/Button";
import { withRouter } from 'react-router';
import { signIn,getUsersByAuthType } from '../../Api-Utills/ApiUtil';

class Login extends Component {

 
    state = {
      Username: {
        type: "text",
        name: "",
        id: "Username",
        placeholder: "Enter Your User Name"
      },
  
      Password: {
        type: "password",
        name: "",
        id: "Password",
        placeholder: "Enter Your Password"
      },
  
      button: {
        id: "Signin",
        value: "Sign In",
        link: "Create an Account",
        to: "/CreateUsers"
      },
  
      errors: {
        emailError: " ",
        passwordError: " "
      },
  
      Loginerror:""
  
    };
  
  Validation = () => {
    let errorRepot = false;
    let preState = this.state.errors;

    if (this.state.Username.name.length === 0) {
      preState.emailError = "UserName should not be Empty.";
      errorRepot = true;
    } else {
      preState.emailError = "";
    }

    if (this.state.Password.name.length === 0) {
      preState.passwordError = "Password should not be empty";
      errorRepot = true;
    } else {
      preState.passwordError = "";
    }

    if (errorRepot) {
      this.setState({
        error: preState
      });
      return true;
    }
  };

  handleElement = (e, id) => {
    let target = e.target;
    let value = target.value;
  
    this.setState({
     [id]: { ...this.state[id], name: value }
    });
  };

  handleSublmit = e => {
    e.preventDefault();

    let NoError = this.Validation();
    if (!NoError) {

      const reqdata = {
        userName: "admin",
        password: "1111"
      };
      
     
      signIn(reqdata).then(response => {
          sessionStorage.setItem("token", response.data.accessToken);
         
          if (response.status === 200) {
            getUsersByAuthType('all').then(getUserResponse => {

                this.userDetails = getUserResponse.data;
                let userdata = this.userDetails.filter(user=>{
                  return user.userName === this.state.Username.name
                })

                if(userdata.length > 0){

                  let roll = userdata[0].userRoll ? userdata[0].userRoll.rollName : '';
                  let authorize = userdata[0].authorize;
                  if(authorize === "Y"){
                    sessionStorage.setItem("userName", userdata[0].userName);
                        sessionStorage.setItem("userRoll", roll);
                        this.props.history.push({ pathname: '/admin/dashboard'});
                  }else{
                    this.setState({
                      Username: { type: "text", name: "", id: "Username", placeholder: "Enter Your User Name" },
                      Password: { type: "password", name: "", id: "Password", placeholder: "Enter Your Password" },
                        Loginerror : "Login Approval is pending. Please contact to administrator."
                      })
                  }

                }else{
                  this.setState({
                    Username: { type: "text", name: "", id: "Username", placeholder: "Enter Your User Name" },
                    Password: { type: "password", name: "", id: "Password", placeholder: "Enter Your Password" },
                    Loginerror : "No record found."
                  })
                }

              }).catch(error => {
                console.log(error);
              });

          } 
          
        })
        .catch(error => {
          console.log(error);
        });
 
    }
  };

  render() {

    const style = {
      backgroundColor: "blue",
      color: "white"
    };

    return (
      <div className="container">
        <div className="row justify-content-center align-items-center vh-100">
          <div className="col-md-8 ">
            <Card className="Logincard">
              <Form onSubmit={this.handleSublmit} className="Login-form">
                <FormGroup>
                   <Label className="login-label" for="Username">USERNAME</Label>
                    <div className="input-group-box input-group-sm">
                    <i icon="envelope" color="#6DB65B" className="fa fa-user format-icon" />
                 
                  <InputElement
                    id = {this.state.Username.id}
                    value = {this.state.Username.name}
                    type = {this.state.Username.type}
                    placeholder = {this.state.Username.placeholder}
                    error = {this.state.errors.emailError}
                    onChange = {event =>this.handleElement(event, this.state.Username.id) }
                  />
                  
                  </div>
                  <span className="Span" style={{color: 'red'}}>{this.state.errors.emailError}</span>
                </FormGroup>

                <FormGroup>
                  <Label className="login-label" for="password">PASSWORD</Label>
                    <div className="input-group-box input-group-sm">
                    <i icon="envelope" color="#6DB65B" className="fa fa-lock format-icon" />
                  <InputElement
                    id = {this.state.Password.id}
                    value = {this.state.Password.name}
                    type = {this.state.Password.type}
                    placeholder = {this.state.Password.placeholder}
                    error = {this.state.errors.passwordError}
                    onChange = {event => this.handleElement(event, this.state.Password.id) }
                  />
                  </div>
                  <span className="Span" style={{color: 'red'}}>{this.state.errors.passwordError}</span>
                </FormGroup>

                <FormGroup>
                <span className="loginerror" style={{color: 'red'}}>{this.state.Loginerror}</span>
                </FormGroup>

                <FormGroup>
                  <ButtonElment
                    style={style}
                    id={this.state.button.id}
                    value={this.state.button.value}
                    link={this.state.button.link}
                    to={this.state.button.to}
                  />
                </FormGroup>
              </Form>

            </Card>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Login);
