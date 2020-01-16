import React from "react";
import AdminDashboard from "../AdminDashboard/AdminDashboard";
import Login from "../Login/Login";
import CreateUser from "../CreateUser/CreateUser";
import { Route, Switch } from "react-router-dom";
import EditUser from "../EditUser/EditUser";
import RolesComponent from "../Roles/Roles";
import personalnfo from "../UserInfo/personalnfo";
import PrivateRoute from "../../Component/PrivateRoute/PrivateRoute";
import ApproveComponent from '../../Container/Approve/Approve';
import PropTypes from 'prop-types';

const RouteComponent = (props) => {

    return (
      <Switch>
        <Route path={["/"]} component={Login} exact />
        <PrivateRoute
          path={["/admin/dashboard", "/users"]}
          component={AdminDashboard}
          exact
          props={props.childProps}
        />
        <PrivateRoute
          path="/CreateUsers"
          component={CreateUser}
          exact
          props={props.childProps}
        />
        <PrivateRoute
          path={["/EditUser?:id", "/EditUser"]}
          component={EditUser}
          exact
          props={props.childProps}
        />
        <PrivateRoute
          path={["/personalInfo"]}
          component={personalnfo}
          exact
          props={props.childProps}
        />
        <PrivateRoute
          path={"/Roles"}
          component={RolesComponent}
          exact
          props={props.childProps}
        />
        <PrivateRoute
          path={"/ApproveUser"}
          component={ApproveComponent}
          exact
          props={props.childProps}
        />
        <Route path={"*"} component={Login} exact />
      </Switch>
    );
 
}

RouteComponent.propTypes = {
  childProps : PropTypes.object
}

export default RouteComponent;
