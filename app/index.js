var React = require('react');
import { Route, BrowserRouter as Router } from 'react-router-dom'
var ReactDOM = require('react-dom');
import "./components/helper/reboot.css";
import App from './components/App';
import Login from './components/authentication/Login';
import Register from './components/authentication/Register';

class InitialRouting extends React.Component {
    render() {
        return (
          <Router>
                <Route exact path='/app' component={App} />
                <Route exact path='/login' component={Login} />
                <Route exact path='/register' component={Register} />
          </Router>
        );
    }
}

ReactDOM.render(
    <InitialRouting />,
    document.getElementById('app')
);
