import React from 'react';
import logo from '../logo.svg';
import '../styles/App.css';
import Posts from './Posts'
import Header from './Header'
import { Switch, Route } from 'react-router-dom'
import Login from './Login'


function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
          <Route exact path ="/" component={Posts}/>
          <Route exact path = "/login" component={Login} />
      </Switch>
    </div>
  );
}

export default App;
