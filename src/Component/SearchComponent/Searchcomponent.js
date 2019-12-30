import React from 'react';
import { Input,Label } from 'reactstrap';

const SearchComponent = (props) =>{
    return(
        <div className="input-group-box input-group-sm m-2">
               
                <Label for="serchuser">SEARCH BY USER NAME</Label>
                    <div className="input-group-box input-group-sm mb-3">
                       
                        <Input className="search"  name="serchuser" id="serchuser" placeholder="" onChange={props.onChange}/>
                        <i icon="search" color="#6DB65B" className="fas fa-search format-icon" />
                    </div>

               
           
        </div>    
    );
}

export default SearchComponent;