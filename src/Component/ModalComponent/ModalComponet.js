import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import PropTypes from 'prop-types';

const ModalComponent = props => {
  const [show, setShow] = useState(true);

  let user = props.state.employee.filter(user => {
    return user.emailId === props.state.showuser.mail;
  });

  const handleClose = () => {
    let showuser = setShow(!show);
    props.viewUser(showuser);
  };

  let modal = user.map((user, index) => (
    <Modal
      key={index} show={show} onHide={handleClose} size="md" aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title><h5 className="card-title">{user.userName}</h5></Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>EmailId : {user.emailId}</p>
        <p>Mobile No. : {user.mobileNo}</p>
        <p>userRoll : {user.userRoll ? user.userRoll.rollName : ""}</p>
      </Modal.Body>
    </Modal>
  ));

  return (
    <div className="col-md-4 offset-md-4">
      {/* <UncontrolledCollapse  key={index} toggler={`#view_button_${index}`}>
                            <Card className="infoTab">
                            <CardBody>
                              
                            <h5 className="card-title">{user.userName}</h5>
                            <p className="card-text">EmailId : {user.emailId}</p>
                            <p className="card-text">Mobile No. : {user.mobileNo}</p>
                            <p className="card-text">userRoll : {user.userRoll ? user.userRoll.rollName : ''}</p>
                            </CardBody>
                            </Card>
                        </UncontrolledCollapse> */}
                        {modal}
    </div>
  );
};

ModalComponent.propTypes = {
  viewUser : PropTypes.func,
   state : PropTypes.object
}

export default ModalComponent;
