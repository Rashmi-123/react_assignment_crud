import React, { Component } from "react";
import { Input, Label } from "reactstrap";
import { getUsersByAuthType } from "../../Api-Utills/ApiUtil";
import PropTypes from 'prop-types'; 

class SearchComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      employee: props.childprops.employee,
      LoginRole: props.childprops.LoginUser,
      authtype: props.childprops.authtype,
      error: { noDataFoundError: "" }
    };
  }

  searchuser = event => {
    let search = event.target.value;
    let authtype = this.state.authtype;
    let LoginUser = this.state.LoginRole;

    getUsersByAuthType(authtype).then(response => {
      if (response.data !== null) {
        if (LoginUser === "administrator") {
          this.setState({
            employee: response.data
          });
        } else if (LoginUser === "operator") {
          let newstate = response.data.filter(user => {
            let roll = user.userRoll ? user.userRoll.rollName : "";
            return roll !== "administrator";
          });
          this.setState({
            employee: newstate
          });
        } else if (LoginUser === "accessuser") {
          let newstate = response.data.filter(user => {
            let roll = user.userRoll ? user.userRoll.rollName : "";
            return roll === "accessuser";
          });
          this.setState({
            employee: newstate
          });
        }

        this.userdetail = this.state.employee;
        let searchuser = this.userdetail.filter(emp => {
          return emp.userName.toLowerCase().includes(search.toLowerCase());
        });

        if (searchuser.length !== 0) {
          this.setState({
            employee: searchuser,
            error: { noDataFoundError: "" }
          });
        } else {
          this.setState({
            employee: searchuser,
            error: { noDataFoundError: "No record found" }
          });
        }
      }
      let reqdata = {
        employee: this.state.employee,
        error: this.state.error
      };
      this.props.childprops.searchuser(reqdata);
    });
  };

  render() {
    return (
      <div className="input-group-box input-group-sm m-2">
        <Label for="serchuser">SEARCH BY USER NAME</Label>
        <div className="input-group-box input-group-sm mb-3">
          <Input
            className="search"
            name="serchuser"
            id="serchuser"
            placeholder=""
            onChange={this.searchuser}
          />
          <i
            icon="search"
            color="#6DB65B"
            className="fas fa-search format-icon"
          />
        </div>
      </div>
    );
  }
}

SearchComponent.propTyes = {
  childprops : PropTypes.object
}

export default SearchComponent;
