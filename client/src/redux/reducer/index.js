import Swal from 'sweetalert2';
const initialState = {
    favorite: [],
    movies: [],
    findedMovie:[],
    userToken:"" 
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

  if (action.type === "FIND_FAV") {
    return {
      ...state,
      favorite: action.payload
    };
  }

  if (action.type === "FIND_MOVIE") {
    return {
      ...state,
      findedMovie: action.payload
    };
  }
  if (action.type === "FIND_TITLE_MOVIE") {
    const movies = state.movies.filter(movie => movie?.title?.toLowerCase().includes(action.payload.toLowerCase()))
    if(movies.length > 0){
      return {
        ...state,
        movies: movies
      };
    }else{
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'No match',
        showConfirmButton: false,
        timer: 1500
      })
      
    }

  }

  if (action.type === "ADD_MOVIE") {
    
    return {
      ...state,
      movies: [action.payload,...state.movies]
      };
  }

  if (action.type === "ADD_FAV") {
    
    const movie = {...state.movies.find(mov =>  mov.id === action.payload.id)}
    
    return {
      ...state,
      favorite: [movie,...state.favorite]
      };
  }

  if (action.type === "LOGIN_IN") {
    return {
      ...state,
      userToken: action.payload
    };
  }

  if (action.type === "LOGOUT") {
    return {
      ...state,
      userToken: action.payload
    };
  }

  if (action.type === "DELETE_FAV") {
    return {
      ...state,
      favorite: state.favorite.filter(movie => movie.id !== Number(action.payload))
    };
  }
    
    return state;
  }
  
  export default rootReducer;