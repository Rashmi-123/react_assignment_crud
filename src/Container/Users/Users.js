import React, { PureComponent } from "react";
import { Table, Button } from "react-bootstrap";
// import { CardBody, UncontrolledCollapse } from "reactstrap";
import "./Users.css";
import { withRouter } from "react-router";
import SelectComponent from "../../Component/Select/SelectComponenet";
import SearchComponent from "../../Component/SearchComponent/Searchcomponent";
import {
  getUsersByAuthType,
  changeAuthorizeStatus
} from "../../Api-Utills/ApiUtil";
import ModalComponent from '../../Component/ModalComponent/ModalComponet';

class Users extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      employee: props.data.data,
      LoginRole: props.data.LoginUserRole,
      authtype: "all",
      error: {
        noDataFoundError: ""
      },
      showuser: {
        show: false,
        mail:''
      }
    };
  }

  editUser = username => {
    let user = this.state.employee.filter(user => {
      return user.userName === username;
    });

    this.props.history.push({
      pathname: `/EditUser?name=${username}`,
      state: { detail: user }
    });
  };

  changeStatus = reqdata => {
    changeAuthorizeStatus(reqdata).then(response => {
      if (response.status === 200) {
        let authtype = this.state.authtype;
        getUsersByAuthType(authtype)
          .then(response => {
            if (response.status === 200) {
              this.setState({ employee: response.data });
            }
          })
          .catch(error => {
            console.log(error);
          });
      }
    });
  };

  //================== user reject code ======================//
  rejectUser = userID => {
    let reqdata = {
      authorize: "N",
      userId: userID
    };
    this.changeStatus(reqdata);
  };

  //================== user approval code ======================//
  approveUser = userID => {
    let reqdata = {
      authorize: "Y",
      userId: userID
    };
    this.changeStatus(reqdata);
  };

  //================== serach code ======================//
  searchuser = reqdata => {
    this.setState({ employee: reqdata.employee, error: reqdata.error });
  };

  //================== showUser code ======================//
  showUser = reqdata => {
    this.setState({ employee: reqdata.employee, error: reqdata.error });
  };

//============== for modal ====================//

viewUser = (mailid) =>{

  this.setState({showuser: {
                    show: !this.state.showuser.show,
                    mail: mailid
                  }})
}

  render() {
    let { employee } = this.state;

    if (employee.length !== undefined) {
      var listItems = employee.map((user, index) => (
        <>
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{user.userId}</td>
            <td>{user.userName}</td>
            <td>{user.emailId}</td>
            <td>{user.mobileNo}</td>
            <td>{user.authorize}</td>
            {user.userRoll ? <td>{user.userRoll.rollName}</td> : <td></td>}

            {this.state.LoginRole === "administrator" ? (
              <td>
                {user.authorize === "Y" ? (
                  <Button
                    className="rejectButton"
                    onClick={() => this.rejectUser(user.userId)}
                  >
                    Reject
                  </Button>
                ) : (
                  <Button
                    className="approveButton"
                    onClick={() => this.approveUser(user.userId)}
                  >
                    Approve
                  </Button>
                )}
              </td>
            ) : null}

            {this.state.LoginRole === "administrator" ? (
              <td>
                <Button
                  className="editButton"
                  onClick={() => this.editUser(user.userName)}
                >
                  Edit
                </Button>
              </td>
            ) : null}

            <td>
              <Button
                className="viewButton"
                color="primary"
                id={`view_button_${index}`}
                onClick = {() => this.viewUser(user.emailId)}
              >View
              </Button>
            </td>
          </tr>
        </>
      ));
    }

    let childprops = {
      authtype: this.state.authtype,
      LoginUser: this.state.LoginRole,
      searchuser: this.searchuser,
      showUser: this.showUser,
      employee: this.state.employee
    };

    var header = sessionStorage.getItem("token");
    var selectuser = sessionStorage.getItem("token") ? (
      <SelectComponent childprops={childprops} />
    ) : null;
    var searchuser = sessionStorage.getItem("token") ? (
      <SearchComponent childprops={childprops} />
    ) : null;

    return (
      <div>
        <div className="row">
          <div className="col-md-3">{selectuser}</div>
          <div className="col-md-3">{searchuser}</div>
        </div>

        {header ? (
          <Table
            striped
            bordered
            hover
            size="sm"
            responsive
            className="usertable"
          >
            <thead>
              <tr>
                <th>Sr No.</th>
                <th>User ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Mobile</th>
                <th>Authorized</th>
                <th>Role</th>
                <th colSpan="3">Action</th>
              </tr>
            </thead>
            <tbody>
              {this.state.error.noDataFoundError ? (
                <tr>
                  <td colSpan="10">
                    <span className="Span">
                      {this.state.error.noDataFoundError}
                    </span>
                  </td>
                </tr>
              ) : null}

              {listItems}
            </tbody>
          </Table>
        ) : null}
        {this.state.showuser.show ? <ModalComponent viewUser={this.viewUser} state={this.state} /> : null}
      </div>
    );
  }
}

export default withRouter(Users);
