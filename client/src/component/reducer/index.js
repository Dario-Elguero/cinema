
const initialState = {
    favorite: [],
    movies: [], 
};

function rootReducer(state = initialState, action) {
    
    if (action.type === "GET_MOVIES") {
        return {
          ...state,
          movies: action.payload
        };
    }

  if (action.type === "FIND_ID") {
    return {
      ...state,
      detail: action.payload
    };
  }
  if (action.type === "ADD_FAV") {
    return {
      ...state,
      favorite: [action.payload,...state.favorite]
    };
  }
  if (action.type === "FIND_CLIMA") {
    return {
      ...state,
      clima: [action.payload,...state.clima]
    };
  }
  if (action.type === "FIRST") {
    return {
      ...state,
      first: action.payload
    };
  }
  if (action.type === "REMOVE_FAV") {
    return {
      ...state,
      favorite: state.favorite.filter(movie => movie.id !== action.payload)
    };
  }
    
    return state;
  }
  
  export default rootReducer;