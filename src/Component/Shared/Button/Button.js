import React from "react";
import { Button, FormGroup } from "reactstrap";
import { Link } from "react-router-dom";
import "./Button.css";

const ButtonElment = props => {
  return (
    <div>
      <FormGroup>
        <Button className="Login-button" id={props.id}>
          {props.value}
        </Button>
        <u className="login-link-ul">
          <Link className="link" to={props.to}>
            {props.link}
          </Link>
        </u>
      </FormGroup>
    </div>
  );
};

export default ButtonElment;
