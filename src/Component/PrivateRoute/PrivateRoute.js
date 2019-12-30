import React from 'react';
import {
    Route,
    Redirect
} from "react-router-dom";

// const fakeAuth = {
//     isAuthenticated: false,
//     authenticate(cb) {
//       if (sessionStorage.getItem("token")) {
//         this.isAuthenticated = true;
//         setTimeout(cb, 100); // fake async
//       }
//     },
//     signout(cb) {
//       this.isAuthenticated = false;
//       setTimeout(cb, 100); // fake async
//     }
//   };
  
  const PrivateRoute = ({ component: Component, props: cProps, ...rest }) => {  
    return (
      <Route
        {...rest}
        render={props =>
            cProps.authenticate() === true ? (
            <Component {...props} />
          ) : (
            <Redirect to="/" />
          )
        }
      />
    );
  };

  export default PrivateRoute;