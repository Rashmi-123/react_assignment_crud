import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {
    Input, Form, FormGroup, Label, Card, Button
  } from 'reactstrap';
import './EditUser.css';  
import { getAllUserRoll } from '../../Api-Utills/ApiUtil';

class EditUser extends Component{

    constructor(props){
        super(props);
        this.state = {
            detail : this.props.location.state.detail,
            userRoll :[] 
        }
    }
   
    componentDidMount(){
        getAllUserRoll().then(response => {
            let UserRole = this.state.detail[0].userRoll.rollId;
            let newstate = response.data.filter(user=>{
                return user.rollId !== UserRole
            })

            this.setState({
                userRoll:newstate
            })
        }).catch(error=>{
            console.log(error);
        })
    }

    render(){

        let { userRoll } = this.state;
       
        let option = userRoll.map((role, index) => (
        <option value={role.rollId} key={index}>{role.rollName}</option>
        ))

        return(
            <div>
                
                   <div className="container">
                    <Card className="EdituserCard">    
                     <Form onSubmit={this.handleSubmit} className="">
                    <div className = "row" >
                    
                        <div className = "col-md-6">
                            
                            <FormGroup>
                                <Label for="Username">USERNAME</Label>
                                <div className="input-group-box input-group-sm mb-3">
                                    <i icon="envelope" color="#6DB65B" className="fa fa-user format-icon" />
                                    <Input className="inputnew" type="text" name="name" id="Username" defaultValue={this.state.detail[0].userName}/>
                                    <span></span>
                                </div>
                            </FormGroup>

                            <FormGroup>
                                <Label for="Email">EMAIL ADDRESS</Label>
                                <div className="input-group-box input-group-sm mb-3">
                                    <i icon="envelope" color="#6DB65B" className="fas fa-envelope format-icon" />
                                    <Input className="inputnew" type="Email" name="mail" id="Email" defaultValue={this.state.detail[0].emailId}/>
                                    <span></span>
                                </div>
                            </FormGroup>


                            <FormGroup>
                                <Button className="create-user-button">Edit</Button>
                            </FormGroup>
                            

                        </div>
                        <div className = "col-md-6">
                        <FormGroup>
                                <Label for="UserRole">USER ROLE</Label>
                                <div className="input-group-box input-group-sm mb-3">
                                    <Input className="inputnew" type="select" name="role" id="UserRole" >
                                        <option value={this.state.detail[0].userRoll.rollId}>{this.state.detail[0].userRoll.rollName}</option>
                                        {option}
                                    </Input>
                                    <span></span>
                                </div>
                            </FormGroup>

                           

                            <FormGroup>
                                <Label for="Mobile">MOB NO.</Label>
                                <div className="input-group-box input-group-sm mb-3">
                                    <i icon="envelope" color="#6DB65B" className="fa fa-phone format-icon" />
                                    <Input className="inputnew" type="input" name="mob" id="Mobile" defaultValue={this.state.detail[0].mobileNo} />
                                    <span></span>
                                </div>
                            </FormGroup>

                         </div>
                       
                    </div>
                    </Form>
                    </Card>
                    </div>
         </div>   
        );        
    }

}

export default withRouter(EditUser);