import React, { Component } from "react";
import { Table } from "react-bootstrap";
import "./Roles.css";
import CreateRoleComponent from "./CreateRole/CreateRole";
import { createRole, getAllUserRoll } from "../../Api-Utills/ApiUtil";

class RolesComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roles:[],
      error: {
        noDataFoundError: ""
      }
    };
  }

  componentDidMount(){
    getAllUserRoll().then(response => {
        this.setState({
            roles:response.data
        })
    }).catch(error=>{
        console.log(error);
    })
}

  handleSubmit = reqdata => {

    createRole(reqdata).then(response => {
      if (response.status === 200) {
        this.setState({ roles: [...this.state.roles, JSON.parse(response.config.data)] });
      }
    });
  };

  render() {
    let { roles } = this.state;
    let roledata = [];

    // console.log(this.state.roles.length);

    if (roles.length > 0) {

        let MaxRollid =roles.map(roledata => { return roledata.rollId })
        var maxId = Math.max(...MaxRollid);
        
        roledata = roles.map((role, index) => (
            <tr key={index}>
            <td>{index + 1}</td>
            <td>{role.rollId}</td>
            <td>{role.rollName}</td>
            </tr>
      ));
    } 

    return (
      <div>
       
            <div className="row">
            <div className="col-md-3 offset-md-1">
              <CreateRoleComponent
                handleSubmit={this.handleSubmit}
                roleId={maxId}
              />
            </div>
            <div className="col-md-7">
              <Table
                striped
                bordered
                hover
                size="sm"
                responsive
                className="roles_table"
              >
                <thead>
                  <tr>
                    <th>Sr No.</th>
                    <th>Role ID</th>
                    <th>Role Name</th>
                  </tr>
                </thead>
                <tbody>
                  {roledata.length === 0 ? (
                    <tr>
                      <td colSpan="3">
                        <span className="Span">
                          No record Found
                        </span>
                      </td>
                    </tr>
                  ) : null}
                  {roledata}
                </tbody>
              </Table>
            </div>
          </div>
        
        
      </div>
    );
  }
}

export default RolesComponent;
