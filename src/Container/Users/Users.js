import React, { PureComponent } from "react";
import { Table, Card, Button } from "react-bootstrap";
import { CardBody, UncontrolledCollapse } from "reactstrap";
import "./Users.css";
import { withRouter } from 'react-router';
import SelectComponent  from '../../Component/Select/SelectComponenet'
import SearchComponent from "../../Component/SearchComponent/Searchcomponent";
import {getUsersByAuthType,changeAuthorizeStatus } from '../../Api-Utills/ApiUtil';

class Users extends PureComponent {
  
  constructor(props) {
    super(props);
   
    this.state = {
      employee: props.data.data,
      LoginRole : props.data.LoginUserRole,
      authtype: 'all',
      error: {
        noDataFoundError:''
      }
    };
  }


  editUser = (username) =>{
    let user = this.state.employee.filter(user=>{
        return user.userName === username
    })

    this.props.history.push({ 
      pathname: `/EditUser?name=${username}`,
      state: { detail: user}
      });
  }

  changeStatus = reqdata =>{

    changeAuthorizeStatus(reqdata).then(response =>{
      if(response.status === 200){
        let authtype = this.state.authtype;
        getUsersByAuthType(authtype).then(response => {
          if(response.status === 200){
            this.setState({employee:response.data})
          }
        }).catch(error=>{ console.log(error); })  
      }
    })
  }

  rejectUser = (userID) =>{
    let reqdata = {
      authorize: "N",
      userId: userID
    }
    this.changeStatus(reqdata);
  }

  approveUser = (userID) =>{
    // console.log("approve");
    let reqdata = {
      authorize: "Y",
      userId: userID
    }
    this.changeStatus(reqdata);
  } 
  
  searchuser = (event) =>{
    let search = event.target.value 
    let authtype = this.state.authtype;
    let LoginUser = this.state.LoginRole;
     
    getUsersByAuthType(authtype).then(response => {
        if(response.data !== null){

          if(LoginUser === "administrator"){
            this.setState({
              employee:response.data
            })
          }else if(LoginUser === "operator"){
            let newstate = response.data.filter(user=>{
              let roll = user.userRoll ? user.userRoll.rollName : '';
              return roll !== "administrator"
            })
            this.setState({
              employee:newstate
            })
          }else if(LoginUser === "accessuser"){
            let newstate = response.data.filter(user=>{
              let roll = user.userRoll ? user.userRoll.rollName : '';
              return roll === "accessuser"
            })
            this.setState({
              employee:newstate
            })
        }

          this.userdetail = this.state.employee;
            let searchuser =   this.userdetail.filter(emp => {
            return emp.userName.toLowerCase().includes(search.toLowerCase());
            });

            if(searchuser.length !== 0){
                this.setState({
                  employee : searchuser,
                  error:{ noDataFoundError:"" }
              })
            }else{
              this.setState({
                employee : searchuser,
                error:{ noDataFoundError:"No record found" }
            })
            }
           
        }
      });

}


  showUser = (event) =>{
    let select = event.target.value 
    let authtype = this.state.authtype;
    let LoginUser = this.state.LoginRole;
    
    getUsersByAuthType(authtype).then(response => {
      if(response.data !== null){


        if(LoginUser === "administrator"){
          this.setState({
            employee:response.data
          })
        }else if(LoginUser === "operator"){
          let newstate = response.data.filter(user=>{
            let roll = user.userRoll ? user.userRoll.rollName : '';
            return roll !== "administrator"
          })
          this.setState({
            employee:newstate
          })
        }else if(LoginUser === "accessuser"){
          let newstate = response.data.filter(user=>{
            let roll = user.userRoll ? user.userRoll.rollName : '';
            return roll === "accessuser"
          })
          this.setState({
            employee:newstate
          })
      }

        this.userdetail = this.state.employee;
          let selectuser; 

           if(select !== authtype){
                 selectuser = this.userdetail.filter(user => {
                   return user.authorize === select;
               });
             }else{selectuser = this.userdetail;}
 
           if(selectuser.length !== 0){
               this.setState({
                 employee : selectuser,
                 error:{ noDataFoundError:"" }
             })
           }else{
             this.setState({
               employee : selectuser,
               error:{ noDataFoundError:"No record found" }
           })
           }

      }
    });
   
  }


  render() {

    let { employee } = this.state;
    
    if (employee.length !== undefined) {
      var listItems = employee.map((user, index) => (
        
        <>
          <tr key={index}>
            <td>{index+1}</td>
            <td>{user.userId}</td>
            <td>{user.userName}</td>
            <td>{user.emailId}</td>
            <td>{user.mobileNo}</td>
            <td>{user.authorize}</td>
            {user.userRoll ? <td>{user.userRoll.rollName}</td> : <td></td>}
            
              {(this.state.LoginRole === "administrator") ?
                <td>{user.authorize === "Y" ? 
                  <Button className="rejectButton" onClick={() => this.rejectUser(user.userId)}>Reject</Button> : 
                  <Button className="approveButton" onClick={() => this.approveUser(user.userId)}>Approve</Button> }
              </td> : null }
               

               {(this.state.LoginRole === "administrator") ? <td>
                 <Button className="editButton" onClick={() => this.editUser(user.userName)}>Edit</Button>
               </td> : null}
              

            <td>
              <Button className="viewButton"
                color="primary" id={`view_button_${index}`}> View </Button>
            </td>
          </tr >
          <tr>
          <td colSpan="10">
                <div className="row"> 
                    <div className="col-md-4 offset-md-4">
                        <UncontrolledCollapse  key={index} toggler={`#view_button_${index}`}>
                            <Card className="infoTab">
                            <CardBody>
                              
                            <h5 className="card-title">{user.userName}</h5>
                            <p className="card-text">EmailId : {user.emailId}</p>
                            <p className="card-text">Mobile No. : {user.mobileNo}</p>
                            <p className="card-text">userRoll : {user.userRoll ? user.userRoll.rollName : ''}</p>
                            </CardBody>
                            </Card>
                        </UncontrolledCollapse>
                    </div>
                </div>
              </td>
          </tr>
        </>
      ));
    }

       var header = sessionStorage.getItem("token");
       var selectuser = (sessionStorage.getItem('token')) ? <SelectComponent onChange={this.showUser}/> : null;
       var searchuser = (sessionStorage.getItem('token')) ? <SearchComponent onChange={this.searchuser}/> : null;
       
       return (
      <div>
      
          <div className="row">
            <div className="col-md-3">
              {selectuser}
            </div>
            <div className="col-md-3">
              {searchuser}
            </div>
          </div>
        
        
        {header ? <Table striped bordered hover size="sm" responsive className="usertable"> 
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
            {this.state.error.noDataFoundError ? 
              <tr><td colSpan="10"><span className="Span">{this.state.error.noDataFoundError}</span></td></tr> : null
            }
          
            {listItems}</tbody>
        </Table> : null }
      </div>
    );
  }
}

export default withRouter(Users);
