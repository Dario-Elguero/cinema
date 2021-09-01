import { createStore, applyMiddleware } from "redux"; //se saco compose
import rootReducer from "../redux/reducer";
import thunk from "redux-thunk";
import {composeWithDevTools} from 'redux-devtools-extension';

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
);
  
export default store;
