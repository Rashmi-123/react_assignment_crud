import React,{Component} from 'react';
import {
    Input, Form, FormGroup, Label, Card, Button
  } from 'reactstrap';
import './CreateUser.css';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { signUp,getAllUserRoll } from '../../Api-Utills/ApiUtil';



class CreateUser extends Component{

    state = {
        name : '',
        mail : '',
        role : '',
        password : '',
        mob : '',
        error : {
            nameError : '',
            mailError : '',
            roleError : '',
            passwordError : '',
            mobileError : ''
        },
        userRoll:[],
        exituserError : ''    
    };

    handleElement = e =>{
        
        let target = e.target;
        let name = target.name;
        let value = target.type === 'select' ? target.selected : target.value;;

        this.setState({
            [name] : value
        });

   }

   validateForm = () => {
    let error  = false;
    let tempError = this.state.error;

    if(this.state.name.length === 0){
        tempError.nameError = "Username should not be empty"; 
        error = true;
    }else{
        tempError.nameError = '';
    }

    if(this.state.mail.length === 0){
        tempError.mailError = "Email should not be empty"; 
        error = true;
    }else{
        tempError.mailError = '';
    }

    if(this.state.password.length === 0){
        tempError.passwordError = "Password should not be empty"; 
        error = true;
    }else{
        tempError.passwordError = '';
    }

    if(this.state.role.length === 0){
        tempError.roleError = "Role should not be empty"; 
        error = true;
    }else{
        tempError.roleError = '';
    }

    if(this.state.mob.length === 0){
        tempError.mobileError = "Mobile No. should not be empty"; 
        error = true;
    }else{
        tempError.mobileError = '';
    }

    if(error){
        this.setState({
            error : tempError
        });
        return true;
    }
    
} 

componentDidMount(){
    getAllUserRoll().then(response => {
        this.setState({
            userRoll:response.data
        })
    }).catch(error=>{
        console.log(error);
    })
}

   
   handleSubmit = e => {
        e.preventDefault();

        let noError = this.validateForm();

        if(!noError){
           
            const reqdata = {
                authorize: "N",
                emailId: this.state.mail,
                mobileNo: this.state.mob,
                password: this.state.password,
                userName: this.state.name,
                userRoll: {
                    rollId: this.state.role
                }
            };

            
            signUp(reqdata).then(response => {
            if (response.status === 200) {
                
                if(response.data.msg !== ""){
                        if(sessionStorage.getItem("token")){
                            this.props.history.push({ pathname: '/admin/dashboard' });
                        }else{
                            this.props.history.push({ pathname: './' });
                        }
                    }else{
                        if((response.data.emailIdError !== "") && (response.data.userNameError !== "")){
                            this.setState({exituserError:"Email ID or Username already exist."})
                        }else if(response.data.emailIdError){
                            this.setState({exituserError:"Email ID already exist."})
                        }else if(response.data.userNameError){
                            this.setState({exituserError:"Username already exist."})
                        }
                        this.setState({     
                            name : '',
                            mail : '',
                            role : '',
                            password : '',
                            mob : ''
                        })
        
                    }
                }
            }).catch(error=>{
                console.log(error);
            })
    }

   }

render(){
    
    let header = sessionStorage.getItem("token");
    let { userRoll } = this.state;
   
    let option = userRoll.map((role, index) => (
    <option value={role.rollId} key={index}>{role.rollName}</option>
    ))
   
    return(
        <div>
            
        <div className = "container">
            <div className = "row justify-content-center align-items-center vh-100"> 
                <div className = "col-md-8 offest-md-2">
                <Card id="CreateUsercard">    
                <Form onSubmit={this.handleSubmit} className="create_user_form">
                    <div className = "row" >
                    
                        <div className = "col-md-6">
                            
                            <FormGroup>
                                <Label for="Username">USERNAME</Label>
                                <div className="input-group-box input-group-sm mb-3">
                                    <i icon="envelope" color="#6DB65B" className="fa fa-user format-icon" />
                                    <Input className="inputnew" type="text" name="name" id="Username" placeholder="Username" onChange={this.handleElement} value={this.state.name}/>
                                    <span>{this.state.error.nameError}</span>
                                </div>
                            </FormGroup>

                            <FormGroup>
                                <Label for="Email">EMAIL ADDRESS</Label>
                                <div className="input-group-box input-group-sm mb-3">
                                    <i icon="envelope" color="#6DB65B" className="fas fa-envelope format-icon" />
                                    <Input className="inputnew" type="Email" name="mail" id="Email" placeholder="Email" onChange={this.handleElement} value={this.state.mail}/>
                                    <span>{this.state.error.mailError}</span>
                                </div>
                            </FormGroup>

                            <FormGroup>
                                <Label for="UserRole">USER ROLE</Label>
                                <div className="input-group-box input-group-sm mb-3">
                                    <Input className="inputnew" type="select" name="role" id="UserRole" onChange={this.handleElement} value={this.state.role}>
                                    <option>-Select Role-</option>
                                    {option}
                                    </Input>
                                    <span>{this.state.error.roleError}</span>
                                </div>
                            </FormGroup>

                            <FormGroup>
                                <span>{this.state.exituserError}</span>
                            </FormGroup>   

                            <FormGroup>
                                {header ? <Button className="create-user-button">Create User</Button>:
                                <Button className="create-user-button">Sign Up</Button>
                                }
                                
                            </FormGroup>

                            <FormGroup>
                                {header ? null : <Link to="/">I'm already member.</Link> }
                            </FormGroup>

                        </div>
                        <div className = "col-md-6">
                             <FormGroup>
                                <Label for="Password">PASSWORD</Label>
                                <div className="input-group-box input-group-sm mb-3">
                                    <i icon="envelope" color="#6DB65B" className="fa fa-key format-icon" />
                                    <Input className="inputnew" type="password" name="password" id="Password" placeholder="Password" value={this.state.password} onChange={(event)=>this.handleElement(event,this.state.password)}/>
                                    <span>{this.state.error.passwordError}</span>
                                </div>
                            </FormGroup> 

                            <FormGroup>
                                <Label for="Mobile">MOB NO.</Label>
                                <div className="input-group-box input-group-sm mb-3">
                                    <i icon="envelope" color="#6DB65B" className="fa fa-phone format-icon" />
                                    <Input className="inputnew" type="input" name="mob" id="Mobile" placeholder="Mobile " value={this.state.mob} onChange={(event)=>this.handleElement(event,this.state.mob)}/>
                                    <span>{this.state.error.mobileError}</span>
                                </div>
                            </FormGroup>

                           
                            
                            
                        </div>
                       
                    </div>
                    </Form>
                    </Card>
                </div>
            </div>
        </div>
        </div>
        
    );
}
    

}

export default withRouter(CreateUser);