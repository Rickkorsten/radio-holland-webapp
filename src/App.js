import * as React from 'react';
import Dashboard from './screens/Dashboard';
import Callback from './screens/Callback';
import './css/App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NavBar from './components/GlobalComponents/NavBar/NavBar.js';
import SecuredRoute from './SecuredRoute/SecuredRoute';
import logo from './assets/logo.png'


const Home = () => {
  return (
    <div className='container'>
    <img alt='' src={logo}/>
    </div>
  )
}

class App extends React.Component {
  render() {
    return (

      <Router>
        <div>
          <NavBar />
          <Switch>
            <Route exact path='/' component={Home} />
            <SecuredRoute exact path='/dashboard' component={Dashboard} />
            <Route exact path='/callback' component={Callback} />
          </Switch>
        </div>
      </Router>

    )
  }
}

export default App;
