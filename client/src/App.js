import {Route, Switch} from 'react-router-dom';
import NavBar from '../src/component/navbar/NavBar';
import Login from './component/login/Login';

import './App.css';
import ContainerMovie from './component/containerMovie/ContainerMovie';


function App() {
    return (
    <div className="App">
      <Route path="/" component={NavBar}/>
    <Switch>
      <Route exact path="/login" component={Login}/>
      <Route exact path="/" component={ContainerMovie}/>

    </Switch>
    </div>
  );
}

export default App;
