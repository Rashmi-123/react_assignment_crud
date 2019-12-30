import React from 'react';
import { Input,Label } from 'reactstrap';

const SelectComponent = (props) =>{
    return(
       
                <div className="input-group-box input-group-sm m-2">
                <Label for="userSelect">SHOW USER</Label>
                    <Input className="inputnewuser" type="select" name="userSelect" id="userSelect" onChange={props.onChange}>
                    <option defaultValue="selected" value="all"></option>
                    <option value="all">ALL</option>
                    <option value="Y">Authorized</option>
                    <option value="N">Unauthorized</option>
                    </Input>
                
           
        </div>    
    );
}

export default SelectComponent;