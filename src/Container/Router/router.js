import React, { Component } from 'react';
import AdminDashboard from "../AdminDashboard/AdminDashboard";
import Login from '../Login/Login';
import CreateUser from '../CreateUser/CreateUser';
import { Route, Switch, BrowserRouter as Router,Redirect} from 'react-router-dom';
import EditUser from '../EditUser/EditUser';
import RolesComponent from '../Roles/Roles';
import personalnfo from '../UserInfo/personalnfo';
import HeaderComponent from '../../Component/Hedaer/Header';


const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb) {
   if(sessionStorage.getItem("token")){
        this.isAuthenticated = true
      setTimeout(cb, 100) // fake async
    }

  },
  signout(cb) {
    this.isAuthenticated = false
    setTimeout(cb, 100) // fake async
  }
}

const PrivateRoute = ({ component: Component, ...rest }) => {
  fakeAuth.authenticate();

  return <Route {...rest} render={(props)=>(
    fakeAuth.isAuthenticated === true?
    <Component {...props}/>: <Redirect to="/" />
  )} />

}

class RouteComponent extends Component{

    constructor(props){
        super(props);
        this.state = {
            authenticate : []
        }
    }

    
  
    render(){
      let header = (sessionStorage.getItem("token"));
        return(
                <Router>
                   {header && <HeaderComponent/> }
                    <Switch>
                        <Route path={["/"]} component={Login} exact /> 
                        <PrivateRoute path={["/admin/dashboard","/users"]} component={AdminDashboard} exact />
                        <PrivateRoute path="/CreateUsers" component={CreateUser} exact />
                        <PrivateRoute path={["/EditUser?:id","/EditUser"]} component={EditUser} exact />
                        <PrivateRoute path={["/personalInfo"]} component={personalnfo} exact />
                        <PrivateRoute path={"/Roles"} component={RolesComponent} exact />
                        <Route path={"*"} component={Login} exact />
                    </Switch>
                </Router>
        )
    }

}

export default RouteComponent;




