import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { allMovies, allMovies2 } from './component/action';
import {Route, Switch} from 'react-router-dom';
import NavBar from '../src/component/navbar/NavBar';
import Login from './component/Login';

import './App.css';


function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(allMovies2())
  }, [])
  return (
    <div className="App">
      <Route path="/" component={NavBar}/>
    <Switch>

      <Route exact path="/login" component={Login}/>
      

    </Switch>
    </div>
  );
}

export default App;
