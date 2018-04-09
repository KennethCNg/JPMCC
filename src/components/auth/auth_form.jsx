import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import * as AuthService from '../../util/auth_services';
import { Grid, Button } from 'semantic-ui-react';

class AuthForm extends React.Component {
  constructor(props) {
    super(props);

   this.handleLoginClick = this.handleLoginClick.bind(this);
  }

  componentWillMount() {
    const { history, loginError, loginSuccess } = this.props;
    AuthService.lock.on('authenticated', authResult => {
      AuthService.lock.getUserInfo(authResult.accessToken, (error, profile) => {
        if (error) {
          return loginError(error);
        }
        AuthService.setToken(authResult.idToken);
        AuthService.setProfile(profile);
        loginSuccess(profile);
        history.push({ pathname: '/home' });
        AuthService.lock.hide();
      });
    });
    AuthService.lock.on('authorization_error', error => {
      loginError(error);
      history.push({ pathname: '/' });
    });
  }

  handleLoginClick() {
    AuthService.login();
    this.props.loginRequest();
  }

  render() {
    const { auth } = this.props;
    return (
        <Grid>
          <Grid.Row>
            <Grid.Column width={4} />
  
            <Grid.Column width={8}>
              <span>Login Page</span>
              <Button onClick={this.handleLoginClick}>Login</Button>
              {auth.error && <p>{JSON.stringify(auth.error)}</p>}
            </Grid.Column>

            <Grid.Column width={4} />
          </Grid.Row>
        </Grid>
    );  
  }

}

export default AuthForm;
