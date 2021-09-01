import {Redirect, Route, Switch} from 'react-router-dom';
import NavBar from '../src/component/navbar/NavBar';
import Login from './component/login/Login';

import './App.css';
import ContainerMovie from './component/containerMovie/ContainerMovie';
import PageNotFound from './component/PageNotFound';
import Favorite from './component/favorite/Favorite';
import Admin from './component/admin/Admin';
import PrivateRouteAdmin from './component/PrivateRouteAdmin';
import PrivateRouteUsers from './component/PrivateRouteUsers';


function App() {
    return (
    <div className="App">
      <Route path="/" component={NavBar}/>
    <Switch>
      <Route exact path="/login" component={Login}/>
      <Route exact path="/home" component={ContainerMovie}/>
      <PrivateRouteAdmin exact path="/admin" component={Admin}/>
      <PrivateRouteUsers exact path="/favorite" component={Favorite}/>
      <Redirect exact path="/" to="/home" />
      <Route path='*' component={PageNotFound} />

    </Switch>
    </div>
  );
}

export default App;
