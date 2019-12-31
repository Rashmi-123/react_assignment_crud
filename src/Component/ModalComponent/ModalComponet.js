import React from 'react';
import { Modal } from "react-bootstrap";

const ModalComponent = (props) =>{

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return(
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
                        <Modal show={this.state.show} onHide={this.handleClose} animation={false} size="md"
                            aria-labelledby="contained-modal-title-vcenter"
                            centered>
                          <Modal.Header closeButton>
                            <Modal.Title>Modal heading</Modal.Title>
                          </Modal.Header>
                          <Modal.Body>
                            Woohoo, you're reading this text in a modal!
                          </Modal.Body>
                        </Modal>
                </div>
    );

}

export default ModalComponent;
