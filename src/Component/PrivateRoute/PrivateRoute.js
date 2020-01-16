import React from 'react';
import {
    Route,
    Redirect
} from "react-router-dom";
import PropTypes from 'prop-types';

  
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

  PrivateRoute.propTypes = {
    Component : PropTypes.object,
    cProps : PropTypes.object
  }


  export default PrivateRoute;