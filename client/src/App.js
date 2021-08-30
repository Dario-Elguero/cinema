import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { allMovies, allMovies2 } from './component/action';

import './App.css';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(allMovies2())
  }, [])
  return (
    <div className="App">
      <header>
        APP
      </header>
    </div>
  );
}

export default App;
