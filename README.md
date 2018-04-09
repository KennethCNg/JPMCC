# JPMCC

Hi all, this is a skeleton of a simple React + Redux front-end with Auth0 implementation to login with either Google or Facebook.

### Technologies
Front-end: React, Redux, Auth0
Dependencies: Webpack 4.0, Semantic-UI


### Getting Started

```bash
npm install
npm start
```

The app will be served at `http://localhost:8080`.

### Skeleton Setup

#### Routes: 
This was fairly straight-forward. I used a simple switch case to determine which component would rather render. If the path starts "/" it'll take you to the login form, else you'll be taken to the home container. Note that the app will always default to the first path it matches, so if you switched HomeContainer and AuthFormContainer it will only take you back to the AuthFormContainer.

```js
const App = () => (
  <div className="app">
    <Switch>
      <HomeContainer path="/home"/>
      <AuthFormContainer path="/"/>
    </Switch>
  </div>
);
```

So the clear issue here is what happens if the user decides to just type in `localhost:8080/#/home`? Well they'll have full access. So I figured there several ways to go about this:

1) Utilize local store to check if the user has actually logged in. Window.localStorage would then have a record of it because localStore saves the id_token into the cache. Because this is entirely on the front-end, my natural inclination is to assume that there's some way to get around this. Data is never safe client-side.

2) An ajax call to the backend to fetch the logged in User then bootstrap the User to the front-end with window.currentUser = fetchedUser. Now we have a reference to the user!

From there I could write protected / auth-routes and  check either localStorage or window.currentUser to further secure the home page. 

#### Auth Login

This is the logic that deal with Auth0's login. As you can see, it's simply listening for an authentication to either be success or fail. Either way, a corresponding action will be dispatched to re-render the page.

```js
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
```

#### Actions

Speaking of actions, here are the 4 actions related to authentication. They're pretty self explanatory.

```js
export const loginRequest = () => {
  return {
    type: types.LOGIN_REQUEST
  };
};

export const loginSuccess = profile => {
  return { 
    type: types.LOGIN_SUCCESS,
    payload: { profile }
  };
};

export const loginError = error => ({
  type: types.LOGIN_ERROR,
  error
});

export const logoutSuccess = () => ({
  type: types.LOGOUT_SUCCESS
});
```

#### Reducer
And here is the corresponding reducer that matches up with each dispatched action. This is part of a higher-order reducer that eventually combines the app's whole state. You can find the skeleton under `root_reducer.jsx`

```js
const authReducer = (
  state = {
    isAuthenticated: !AuthService.isTokenExpired(),
    isFetching: false,
    profile: AuthService.getProfile(),
    error: null
  },
  action
) => {
  switch (action.type) {
    case types.LOGIN_REQUEST:
      return {
        ...state,
        isFetching: true,
        error: null
      };
    case types.LOGIN_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isAuthenticated: true,
        profile: action.payload.profile
      };
    case types.LOGIN_ERROR:
      return {
        ...state,
        isFetching: false,
        isAuthenticated: false,
        profile: {},
        error: action.error
      };
    case types.LOGOUT_SUCCESS:
      return {
        ...state,
        isAuthenticated: false,
        profile: {}
      };
    default:
      return state;
  }
};
```