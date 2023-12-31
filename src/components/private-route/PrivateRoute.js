// import React from "react";
// import { Route, Redirect } from "react-router-dom";
// import { connect } from "react-redux";
// import PropTypes from "prop-types";
// import { Dashboard } from "../dashboard/Dashboard";

// const PrivateRoute = ({ component: Component, auth, ...rest }) => (
  
//   <Route
//     {...rest}
//     render={ (props) => 
//       auth.isAuthenticated === true ? (
//         <Component {...props} />
//       ) : (
//         <Redirect to="/login" />
//       )
//     }
//   />
// );

// PrivateRoute.propTypes = {
//   auth: PropTypes.object.isRequired
// };

// const mapStateToProps = state => ({
//   auth: state.auth
// });

// export default connect(mapStateToProps)(PrivateRoute);
import React from "react";
import { Route, Navigate } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Dashboard } from "../dashboard/Dashboard";

const PrivateRoute = ({ component: Component, auth, ...rest }) => (
  <Route
    {...rest}
    element={auth.isAuthenticated === true ? <Component /> : <Navigate to="/login" />}
  />
);

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(PrivateRoute);
