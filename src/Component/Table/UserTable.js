import React from "react";
import { Button } from "react-bootstrap";
import PropTypes from 'prop-types'; 

const TableRow = props => {
  if (props.employee && props.employee.length > 0) {
    var listItems = props.employee.map((user, index) => {
      return (
        <tr key={index}>
          <td>{index + 1}</td>
          <td>{user.userId}</td>
          <td>{user.userName}</td>
          <td>{user.emailId}</td>
          <td>{user.mobileNo}</td>
          <td>{user.authorize}</td>
          {user.userRoll ? <td>{user.userRoll.rollName}</td> : <td></td>}

          {props.role === "administrator" ? (
            <td>
              {user.authorize === "Y" ? (
                <Button
                  className="rejectButton"
                  onClick={() => props.handleRejectUser(user.userId)}
                >
                  Reject
                </Button>
              ) : (
                <Button
                  className="approveButton"
                  onClick={() => props.handleApproveUser(user.userId)}
                >
                  Approve
                </Button>
              )}
            </td>
          ) : null}

          {props.role === "administrator" ? (
            <td>
              <Button
                className="editButton"
                onClick={() => props.handleEditUser(user.userName)}
              >
                Edit
              </Button>
            </td>
          ) : null}

          <td>
            <Button
              className="viewButton"
              color="primary"
              id={`view_button_${index}`}
              onClick={() => props.handleViewUser(user.emailId)}
            >
              View
            </Button>
          </td>
        </tr>
      );
    });
  }

  return <>{listItems}</>;
};

TableRow.propTypes = {
  employee : PropTypes.array,
  handleApproveUser: PropTypes.func,
  handleEditUser: PropTypes.func,
  handleRejectUser: PropTypes.func,
  handleViewUser: PropTypes.func
}

export default TableRow;
