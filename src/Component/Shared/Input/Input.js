import React, { useEffect } from "react";
import { Input } from "reactstrap";
import "./Input.css";

const InputElment = props => {

  useEffect(()=>{
    setTimeout(() => {
      //alert("Welcome");
    }, 10);
    return () => {
      console.log("Cleanup work in use");
    }

  },[])

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

export default InputElment;
