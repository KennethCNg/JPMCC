import React from 'react';
import * as AuthService from '../../util/auth_services';
import { Button } from 'semantic-ui-react';

class Home extends React.Component {
    constructor(props) {
        super(props);

        this.handleLogoutClick = this.handleLogoutClick.bind(this);
    }

    handleLogoutClick() {
        this.props.logoutSuccess();
        AuthService.logout();
        this.props.history.push({ pathname: '/' });
    }

    render() {
        console.log("home");
        const { auth } = this.props;
        return (
            <div>
                <div>
                    <span>Tada, you made it home</span>
                  <Button onClick={this.handleLogoutClick}>Logout</Button>
                </div>
            </div>
        );
    }
}

export default Home;
