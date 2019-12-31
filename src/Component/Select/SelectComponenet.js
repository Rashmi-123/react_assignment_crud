import React, { Component } from 'react';
import { Input,Label } from 'reactstrap';
import { getUsersByAuthType } from "../../Api-Utills/ApiUtil";

class SelectComponent extends Component{

    constructor(props){
        super(props);
        this.state = {
            employee: props.childprops.employee,
            LoginRole: props.childprops.LoginUser,
            authtype: props.childprops.authtype,
            error: { noDataFoundError: "" }
          };
        }

    showuser = (event) =>{

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

            let reqdata = {
                employee: this.state.employee,
                error: this.state.error
              };
              this.props.childprops.searchuser(reqdata);

          });
    
    }


    render(){
    return(
       
                <div className="input-group-box input-group-sm m-2">
                <Label for="userSelect">SHOW USER</Label>
                    <Input className="inputnewuser" type="select" name="userSelect" id="userSelect" onChange={this.showuser}>
                    <option defaultValue="selected" value="all"></option>
                    <option value="all">ALL</option>
                    <option value="Y">Authorized</option>
                    <option value="N">Unauthorized</option>
                    </Input>
                
           
        </div>    
    );
    }
}

export default SelectComponent;