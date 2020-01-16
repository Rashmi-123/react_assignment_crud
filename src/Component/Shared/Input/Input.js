import React from "react";
import { Input } from "reactstrap";
import "./Input.css";
import PropTypes from 'prop-types'; 

const InputElment = props => {

  // useEffect(()=>{
  //   setTimeout(() => {
  //     //alert("Welcome");
  //   }, 10);
  //   return () => {
  //     console.log("Cleanup work in use");
  //   }

  // },[])

  return (
    <div>
      <Input
        type={props.type}
        value={props.value}
        id={props.id}
        placeholder={props.placeholder}
        onChange={props.onChange}
      />
    </div>
  );
};

InputElment.propTypes = {
  type : PropTypes.string,
  value : PropTypes.string,
  id : PropTypes.string,
  placeholder : PropTypes.string,
  onChange : PropTypes.func,
}

export default InputElment;
