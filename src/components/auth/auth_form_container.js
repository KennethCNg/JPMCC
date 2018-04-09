import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { loginSuccess, loginError, loginRequest } from '../../actions/auth_actions';
import AuthForm from './auth_form';

const mapStateToProps = state => {
  return { 
      auth: state.auth
  };
};


const mapDispatchToProps = dispatch => {
  return {
    loginRequest: () => dispatch(loginRequest()),
    loginSuccess: profile => dispatch(loginSuccess(profile)),
    loginError: error => dispatch(loginError(error)),
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(AuthForm)
);
