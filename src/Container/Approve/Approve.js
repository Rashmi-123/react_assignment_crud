import React, { Component } from 'react';
import { Table } from "react-bootstrap";
import {getUsersByAuthType, changeAuthorizeStatus} from '../../Api-Utills/ApiUtil';
import { Button } from "react-bootstrap";
import SelectRoleComponent from '../Approve/SelectRole/SelectRole'

class ApproveComponent extends Component{

    constructor(props) {
        super(props);
        this.state = {
          user:[],
          LoginRole: sessionStorage.getItem('userRoll'),
          authtype:'all',
          error: {
            noDataFoundError: ""
          }
        };
      }

      componentDidMount(){
        this.getAlluser();
      }

    getAlluser = () =>{
        let authtype = this.state.authtype;
        getUsersByAuthType(authtype).then(response =>{
            this.setState({
                user :  response.data.filter(user =>{
                    return user.authorize === "N"
                })
            })
        }).catch(error=>{
            console.log(error);
        })
      }

 //============= change user status ID =============================//
 changeStatus = reqdata => {
    changeAuthorizeStatus(reqdata).then(response => {
      if (response.status === 200) {
       this.getAlluser();
      }
    });
  };

//================== user approval code ======================//
  approveUser = userID => {
    let reqdata = {
      authorize: "Y",
      userId: userID
    };
    this.changeStatus(reqdata);
  };

  //============== select user according to role =====================//

  selectuser = (user) =>{
    this.setState({
        user:user
    })
  }

    render(){
      
        let { user } = this.state;
        let userdata = [];
       
        if(user.length > 0){
            userdata = user.map((user, index) => (
                <tr key={index}>
                <td>{index + 1}</td>
                <td>{user.userName}</td>
                <td><Button className="approveButton" onClick={()=>{this.approveUser(user.userId)}}>
                    Approve
                </Button></td>
                </tr>
            ))
        }

        let childprops = {
            authtype: this.state.authtype,
            selectuser: this.selectuser
          };

        var selectuser = sessionStorage.getItem("token") ? (
            <SelectRoleComponent childprops={childprops} />
          ) : null;

        return(
             <div>
               
                     <div className="row">
                     <div className="col-md-3 offset-md-1">
                     {selectuser}
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
                             <th>Name</th>
                             <th>Action</th>
                         </tr>
                         </thead>
                         <tbody>
                         {user.length === 0 ? (
                            <tr>
                            <td colSpan="3">
                                <span className="Span">
                                No record Found
                                </span>
                            </td>
                            </tr>
                        ) : null}
                            {userdata}
                         </tbody>
                     </Table>
                     </div>
                 </div>

                      
                
            </div>
        )
    }

}

export default ApproveComponent;