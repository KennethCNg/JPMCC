import { connect } from 'react-redux';
import Home from './home';
import { logoutSuccess } from '../../actions/auth_actions';
import { withRouter } from 'react-router-dom';

const mapStateToProps = state => {
  return {
    // state would include access to the current user via the backend
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logoutSuccess: () => dispatch(logoutSuccess())
  };
};

export default withRouter(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )(Home)
  );
  