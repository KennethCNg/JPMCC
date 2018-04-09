import React from 'react';
import AuthForm from './auth/auth_form_container';
import HomeContainer from './home/home_container';
import { HashRouter, Route, Switch } from 'react-router-dom';


const App = () => (
  <div className="app">
    <Switch>
      <HomeContainer path="/home"/>
      <AuthForm path="/"/>
    </Switch>
  </div>
);

export default App;