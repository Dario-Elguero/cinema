import axios from 'axios';
require("dotenv").config();
const { REACT_APP_LOCALHOST,REACT_APP_PORT_BACK } = process.env;

export function allMovies(){
  return function(dispatch){
  return fetch(`http://${REACT_APP_LOCALHOST}:${REACT_APP_PORT_BACK}/movies`)
    .then(response => response.json())
    .then(response =>{

      dispatch({type:'GET_MOVIES', payload: response})
    })
   
  }
}

export function allMovies2(){
    return async function(dispatch){
    try {
        const dataMovies = await axios.get(`http://${REACT_APP_LOCALHOST}:${REACT_APP_PORT_BACK}/movies`,{
            headers:{
                "x-access-token":"aca va la credencial"
            }
        })
            if(dataMovies.status === 200){
              dispatch({type:'GET_MOVIES', payload: dataMovies})
            }else{
                console.log('nada')
            }
            
        } catch (error) {
            console.log(error)
        }
    }
}