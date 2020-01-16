import React, { Component } from "react";
import Users from "../Users/Users";
import { getUsersByAuthType } from "../../Api-Utills/ApiUtil";

class AdminDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      authtype: "all",
      LoginUserRole: sessionStorage.getItem("userRoll")
    };
  }

  componentDidMount() {
    // !sessionStorage.getItem('token') && this.props.history.push({ pathname: '/' })

    let authtype = this.state.authtype;
    getUsersByAuthType(authtype)
      .then(response => {
        if (this.state.LoginUserRole === "administrator") {
          this.setState({
            data: response.data
          });
        } else if (this.state.LoginUserRole === "operator") {
          let newstate = response.data.filter(user => {
            let roll = user.userRoll ? user.userRoll.rollName : "";
            return roll !== "administrator";
          });
          this.setState({
            data: newstate
          });
        } else if (this.state.LoginUserRole === "accessuser") {
          let newstate = response.data.filter(user => {
            let roll = user.userRoll ? user.userRoll.rollName : "";
            return roll === "accessuser";
          });
          this.setState({
            data: newstate
          });
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    let { data } = this.state;
    return <div>{data.length > 0 && <Users data={this.state} />}</div>;
  }
}


export default AdminDashboard;
