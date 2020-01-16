import React from 'react';
import { Input,Label } from 'reactstrap';
import { getUsersByAuthType } from "../../../Api-Utills/ApiUtil";

const SelectRoleComponent = (childprops) =>{

const selectuser = (e) =>{
    var roleId = parseInt(e.target.value);
    
    getUsersByAuthType(childprops.childprops.authtype).then(response => {
        let user;
        if(response.data){
           if(roleId !== 0){
             user = response.data.filter(user =>{
                return (user.authorize === "N" && user.userRoll.rollId === roleId)
            })
        }else{
                user = response.data.filter(user =>{
                    return (user.authorize === "N")
                })
        }  
            childprops.childprops.selectuser(user);
        }
    }).catch(error=>{
        console.log(error);
    })
}


    return(
        <div>
             <div className="input-group-box input-group-sm m-2">
                <Label for="userSelect">SHOW USER</Label>
                    <Input className="inputnewuser" type="select" name="userSelect" id="userSelect" onChange={selectuser}>
                    <option defaultValue="selected" value="0">All</option>
                    <option value="1">administrator</option>
                    <option value="2">operator</option>
                    <option value="3">accessuser</option>
                    </Input>
                </div>
        </div>
    );
}

export default SelectRoleComponent;

