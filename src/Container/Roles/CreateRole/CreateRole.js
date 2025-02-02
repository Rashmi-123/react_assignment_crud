import React, { Component } from "react";
import { Input, Form, FormGroup, Label, Card, Button } from "reactstrap";
import { withRouter } from "react-router-dom";
import "./CreateRole.css";
import PropTypes from 'prop-types';

class CreateRoleComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      role: "",
      roleId: props.roleId,
      error: ""
    };
  }

  handleElement = e => {
    let target = e.target;
    let value = target.value;
    this.setState({ role: value });
  };

  validateForm = () => {
    let error = false;
    let tempError = this.state.error;

    if (this.state.role.length === 0) {
      tempError = "Role should not be empty";
      error = true;
    } else {
      tempError = "";
    }

    if (error) {
      this.setState({ error: tempError });
      return true;
    }
  };

  rolehandleSubmit = e => {
    e.preventDefault();
    let noError = this.validateForm();

    if (!noError) {
      let reqdata = {
        rollId: this.state.roleId + 1,
        rollName: this.state.role
      };

      this.setState({ role: "" });
      this.props.handleSubmit(reqdata);
    }
  };

  render() {
    return (
      <div>
        <Card className="RollForm">
          <Form onSubmit={this.rolehandleSubmit} className="roleformGroup">
            <FormGroup className="">
              <Label for="rollname">ROLL NAME</Label>
              <div className="input-group-box input-group-sm mb-3">
                <Input
                  className="rollname"
                  type="text"
                  name="name"
                  id="rollname"
                  onChange={this.handleElement}
                  value={this.state.role}
                />
                <span>{this.state.error}</span>
              </div>
            </FormGroup>

            <FormGroup>
              <Button className="addRoleButton">Add</Button>
            </FormGroup>
          </Form>
        </Card>
      </div>
    );
  }
}

CreateRoleComponent.propTypes = {
  handleSubmit : PropTypes.func,
  roleId : PropTypes.number
};

export default withRouter(CreateRoleComponent);
