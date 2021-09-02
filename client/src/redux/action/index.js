import axios from "axios";
import Swal from "sweetalert2";
require("dotenv").config();
const { REACT_APP_LOCALHOST, REACT_APP_PORT_BACK } = process.env;

export function allMovies() {
  return function (dispatch) {
    return fetch(`http://${REACT_APP_LOCALHOST}:${REACT_APP_PORT_BACK}/movies`)
      .then((response) => response.json())
      .then((response) => {
        dispatch({ type: "GET_MOVIES", payload: response });
      });
  };
}

export function allMovies2() {
  return async function (dispatch) {
    try {
      const dataMovies = await axios.get(
        `http://${REACT_APP_LOCALHOST}:${REACT_APP_PORT_BACK}/movies`
      );
      if (dataMovies.status === 200) {
        dispatch({ type: "GET_MOVIES", payload: dataMovies.data });
      }
    } catch (error) {
      console.log(error);
    }
  };
}

export function loginUser(mail, password) {
  return async function (dispatch) {
    try {
      const dataUser = await axios.post(
        `http://${REACT_APP_LOCALHOST}:${REACT_APP_PORT_BACK}/login`,
        {
          mail,
          password,
        }
      );
      if (dataUser.status === 200) {
        sessionStorage.setItem("token", dataUser.data.Token);
        dispatch({ type: "LOGIN_IN", payload: dataUser.data.Token });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "User or Password is invalid",
        footer: '<a href="">WARNING?</a>',
      });
    }
  };
}

export function myFavorites(token) {
  return async function (dispatch) {
    try {
      const favorites = await axios.get(
        `http://${REACT_APP_LOCALHOST}:${REACT_APP_PORT_BACK}/user/favorites`,
        {
          headers: {
            "x-access-token": token,
          },
        }
      );
      if (favorites.status === 200) {
        dispatch({ type: "FIND_FAV", payload: favorites.data.result });
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "No encontro Favoritos",
        text: "algo salio mal",
        footer: '<a href="">WARNING?</a>',
      });
    }
  };
}

export function removeFavorite(token, idMovie) {
  return async function (dispatch) {
    try {
      const favorites = await axios.delete(
        `http://${REACT_APP_LOCALHOST}:${REACT_APP_PORT_BACK}/user/favorite`,
        {
          data: {
            idMovie: idMovie,
          },
          headers: {
            "x-access-token": token,
          },
        }
      );

      if (favorites.status === 200) {
        dispatch({ type: "DELETE_FAV", payload: idMovie });
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "No se pudo sacar favorito",
        text: "algo salio mal",
        footer: '<a href="">WARNING?</a>',
      });
    }
  };
}

export function addFavorite(token, idMovie) {
  return async function (dispatch) {
    try {
      const favorites = await axios({
        method: "post",
        url: `http://${REACT_APP_LOCALHOST}:${REACT_APP_PORT_BACK}/user/favorite`,
        data: { idMovie: idMovie },
        headers: {
          "x-access-token": token,
        },
      });

      if (favorites.status === 200) {
        dispatch({ type: "ADD_FAV", payload: { id: Number(idMovie) } });
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "No se pudo sacar favorito",
        text: "algo salio mal",
        footer: '<a href="">WARNING?</a>',
      });
    }
  };
}

export function addMovie(newMovie) {
  return async function (dispatch) {
    try {
      const token = sessionStorage.getItem("token");
      const movie = await axios({
        method: "post",
        url: `http://${REACT_APP_LOCALHOST}:${REACT_APP_PORT_BACK}/movies`,
        data: {
          title: newMovie.title,
          image: newMovie.image,
          year: newMovie.year,
          description: newMovie.description,
          country: newMovie.country,
          genres: newMovie.genres,
        },
        headers: {
          "x-access-token": token,
        },
      });
      if (movie.status === 200) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "The Movie has been saved",
          showConfirmButton: false,
          timer: 1500,
        });
        newMovie.id = movie.data.idInserted;
        dispatch({ type: "ADD_MOVIE", payload: newMovie });
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "No se pudo agregar",
        text: "algo salio mal",
        footer: '<a href="">WARNING?</a>',
      });
    }
  };
}

export function findMovie(idMovie) {
  return async function (dispatch) {
    try {
      const movie = await axios({
        method: "get",
        url: `http://${REACT_APP_LOCALHOST}:${REACT_APP_PORT_BACK}/movies/${idMovie}`,
      });
      if (movie.status === 200) {
        dispatch({ type: "FIND_MOVIE", payload: movie.data });
      }
    } catch (error) {
      console.log(error);
    }
  };
}

export function findNameMovie(titleMovie) {
  return async function (dispatch) {
    
      dispatch({
        type: "FIND_TITLE_MOVIE",
        payload: titleMovie
      });
    
  };
}
