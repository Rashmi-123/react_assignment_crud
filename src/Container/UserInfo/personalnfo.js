import React,{useState} from 'react';
import {
    Input, Form, FormGroup, Label, Button
  } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import './personalInfo.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const PersonalInfo = () =>{

    const [startDate,setStartDate] = useState(new Date());

        const  handleChange = (date) => {
            setStartDate(startDate => date)
      };

    return(
        <div className = "register">
            <Form>
            <div className="row">
                <div className="col-md-4">
                <FormGroup>
                    <Label for="firstname">FIRST NAME</Label>
                    <div className="input-group-box input-group-sm mb-3">
                        <i icon="user" color="#6DB65B" className="fas fa-user format-icon" />
                        <Input className="inputnew" type="text" name="firstname" id="firstname" placeholder="Enter Your First Name"  />
                        <span></span>
                    </div>
                </FormGroup>
                </div>
                <div className="col-md-4">
                <FormGroup>
                    <Label for="Middlename">MIDDLE NAME</Label>
                    <div className="input-group-box input-group-sm mb-3">
                        <i icon="user" color="#6DB65B" className="fas fa-user format-icon" />
                        <Input className="inputnew" type="text" name="Middlename" id="Middlename" placeholder="Enter Your Middle Name"  />
                        <span></span>
                    </div>
                </FormGroup>
                </div>
                <div className="col-md-4">
                <FormGroup>
                    <Label for="lastname">LAST NAME</Label>
                    <div className="input-group-box input-group-sm mb-3">
                        <i icon="user" color="#6DB65B" className="fas fa-user format-icon" />
                        <Input className="inputnew" type="text" name="lastname" id="lastname" placeholder="Enter Your Last Name"  />
                        <span></span>
                    </div>
                </FormGroup>
                </div>
            </div>

            <div className="row">
                <div className="col-md-4">
                <FormGroup>
                    <Label for="Gender">GENGER</Label>
                    <div className="input-group-box input-group-sm mb-3">
                        <Input className="inputnew" type="select" name="gender" id="gender" placeholder="Gender" >
                        <option defaultValue='selected'>-Select Gender-</option>
                        <option>Male</option>
                        <option>Female</option>
                        </Input>
                        <span></span>
                    </div>
                </FormGroup>
            

                </div>
                <div className="col-md-4">
                <FormGroup>
                    <Label for="Email">DATE OF BIRTH</Label>
                    <div className="input-group-box input-group-sm mb-3">
                        <DatePicker className="datepick"  selected={startDate}
                        onChange={handleChange}/>
                        <span></span>
                    </div>
                </FormGroup>
                </div>
                <div className="col-md-4">
                <FormGroup>
                    <Label for="Email">AGE</Label>
                    <div className="input-group-box input-group-sm mb-3"> <i/>
                        <Input className="inputnew" type="Email" name="mail" id="Email" placeholder="Email"  />
                        <span></span>
                    </div>
                </FormGroup>
                </div>
            </div>

            <div className="row">
                <div className="col-md-4">
                <FormGroup>
                    <Label for="flatno">FALT/BUNGALOW NUMBER</Label>
                    <div className="input-group-box input-group-sm mb-3">
                        <i icon="home" color="#6DB65B" className="fas fa-home format-icon" />
                        <Input className="inputnew" type="text" name="flatno" id="flatno" placeholder="Enter Your Flat/Bungalow Number"  />
                        <span></span>
                    </div>
                </FormGroup>
                </div>
                <div className="col-md-4">
                <FormGroup>
                    <Label for="society">SOCIETY NAME</Label>
                    <div className="input-group-box input-group-sm mb-3">
                        <i icon="home" color="#6DB65B" className="fas fa-home format-icon" />
                        <Input className="inputnew" type="text" name="society" id="society" placeholder="Enter Your Society Name"  />
                        <span></span>
                    </div>
                </FormGroup>
                </div>
                <div className="col-md-4">
                <FormGroup>
                    <Label for="street">STREET NAME/AREA NAME</Label>
                    <div className="input-group-box input-group-sm mb-3">
                        <i icon="street-view" color="#6DB65B" className="fas fa-street-view format-icon" />
                        <Input className="inputnew" type="text" name="street" id="street" placeholder="Enter Your Street/Area Name"  />
                        <span></span>
                    </div>
                </FormGroup>
                </div>
            </div>

            <div className="row">
                <div className="col-md-4">
                <FormGroup>
                    <Label for="city">CITY</Label>
                    <div className="input-group-box input-group-sm mb-3"><i/>
                        <Input className="inputnew" type="text" name="city" id="city" placeholder="Enter Your City Name"  />
                        <span></span>
                    </div>
                </FormGroup>
                </div>
                <div className="col-md-4">
                <FormGroup>
                    <Label for="state">STATE</Label>
                    <div className="input-group-box input-group-sm mb-3"> <i/>
                        <Input className="inputnew" type="text" name="state" id="state" placeholder="Enter Your State Name"  />
                        <span></span>
                    </div>
                </FormGroup>
                </div>
                <div className="col-md-4">
                <FormGroup>
                    <Label for="pincode">PINCODE</Label>
                    <div className="input-group-box input-group-sm mb-3"><i/>
                        <Input className="inputnew" type="text" name="pincode" id="pincode" placeholder="Enter Your PINCODE"  />
                        <span></span>
                    </div>
                </FormGroup>
                </div>
            </div>

            <div className="row">
                <div className="col-md-4">
                <FormGroup>
                    <Label for="phone">PHONE NO</Label>
                    <div className="input-group-box input-group-sm mb-3">
                        <i icon="phone" color="#6DB65B" className="fas fa-phone format-icon" />
                        <Input className="inputnew" type="text" name="phone" id="phone" placeholder="0"  />
                        <span></span>
                    </div>
                </FormGroup>
                </div>
                <div className="col-md-4">
                <FormGroup>
                    <Label for="mob">MOBILE NO</Label>
                    <div className="input-group-box input-group-sm mb-3">
                        <i icon="mobile" color="#6DB65B" className="fas fa-mobile format-icon" />
                        <Input className="inputnew" type="text" name="mob" id="mob" placeholder="9693256854"  />
                        <span></span>
                    </div>
                </FormGroup>
                </div>
                <div className="col-md-4">
                <FormGroup>
                    <Label for="physic">PHYSICAL DIABILITY IF ANY</Label>
                    <div className="input-group-box input-group-sm mb-3"><i />
                        <Input className="inputnew" type="text" name="physic" id="physic" placeholder="Enter Physical Disability If Any"  />
                        <span></span>
                    </div>
                </FormGroup>
                </div>
            </div>

            <div className="row">
                <div className="col-md-4">
                <FormGroup>
                    <Label for="marital">MARITAL STATUS</Label>
                    <div className="input-group-box input-group-sm mb-3"><i/>
                        <Input className="inputnew" type="Email" name="mail" id="Email" placeholder="Email"  />
                        <span></span>
                    </div>
                </FormGroup>
                </div>
                <div className="col-md-4">
                <FormGroup>
                    <Label for="Email">EDUCATION STATUS</Label>
                    <div className="input-group-box input-group-sm mb-3">
                        <i icon="graduation-cap" color="#6DB65B" className="fas fa-graduation-cap format-icon" />
                        <Input className="inputnew" type="Email" name="mail" id="Email" placeholder="Email"  />
                        <span></span>
                    </div>
                </FormGroup>
                </div>
                <div className="col-md-4">
                <FormGroup>
                    <Label for="birthsign">BIRTH SIGN</Label>
                    <div className="input-group-box input-group-sm mb-3">
                        <i icon="birthday-cake" color="#6DB65B" className="fas fa-birthday-cake format-icon" />
                        <Input className="inputnew" type="text" name="birthsign" id="birthsign" placeholder="Enter Your Birth Sign"  />
                        <span></span>
                    </div>
                </FormGroup>
                </div>
            </div>

            <div className="row">
                <div className="col-md-4">
                <FormGroup>
                    <Label for="role">USER ROLE</Label>
                    <div className="input-group-box input-group-sm mb-3">
                        <i icon="user" color="#6DB65B" className="fas fa-user format-icon" />
                        <Input className="inputnew" type="role" name="mail" id="Email" placeholder="User Role"  />
                        <span></span>
                    </div>
                </FormGroup>
                </div>
                <div className="col-md-4">
                <FormGroup>
                    <Label for="userid">USER ID</Label>
                    <div className="input-group-box input-group-sm mb-3">
                        <i icon="id-badge" color="#6DB65B" className="fas fa-id-badge format-icon" />
                        <Input className="inputnew" type="userid" name="userid" id="userid" placeholder="1"  />
                        <span></span>
                    </div>
                </FormGroup>
                </div>
                <div className="col-md-4">
                <FormGroup>
                    <Label for="username">USER NAME</Label>
                    <div className="input-group-box input-group-sm mb-3">
                        <i icon="user-circle" color="#6DB65B" className="fas fa-user-circle format-icon" />
                        <Input className="inputnew" type="text" name="username" id="username" placeholder="admin"  />
                        <span></span>
                    </div>
                </FormGroup>
                </div>
            </div>

            <div className="row">
                <div className="col-md-4">
                <FormGroup>
                    <Label for="Email">EMAIL ADDRESS</Label>
                    <div className="input-group-box input-group-sm mb-3">
                        <i icon="envelope" color="#6DB65B" className="fas fa-envelope format-icon" />
                        <Input className="inputnew" type="Email" name="mail" id="Email" placeholder="Yourname@gmail.com"  />
                        <span></span>
                    </div>
                </FormGroup>
                </div>
                
            </div>

            <div className="row">
                <div className="col-md-4">
                <FormGroup>
                   <Button className="registerButton">Register</Button>
                </FormGroup>
                </div>
            </div>
            </Form>
        </div>
    );
}

export default withRouter(PersonalInfo);