import { useState } from "react";
import { useDispatch } from "react-redux";
import { addMovie } from "../../action";

const Form = () => {
  const dispatch = useDispatch()
const handleSubmit = (e)=>{
  e.preventDefault()
  alert('entro')
  dispatch(addMovie(newMovie))
}
const initialState = {
    title:"",
    year:"",
    image:"",
    description:"",
    country:"",
    genres:[1]
}
const [newMovie, setNewMovie] = useState(initialState);

const handleChange = (e) => {
      
    setNewMovie({
        ...newMovie,
        [e.target.name]: e.target.value
      })

}

  return (
    <div className="containerForm">
      <form className="form" onSubmit={handleSubmit}>
        <div className="container">
          <h1>Add Movie</h1>

          <h3>Title</h3>
          <div>
            <input
              onChange={handleChange}
              name="title"
              placeholder="Title Movie"
              required
            />
          </div>

          <h3>Year</h3>
          <div>
            <input
              type="number"
              onChange={handleChange}
              name="year"
              placeholder="Year"
              width="500px"
              required
            />
          </div>

          <h3>Image - URL</h3>
          <div>
            <input
              onChange={handleChange}
              className="imputImages"
              name="image"
              placeholder="URL image"
              required
            />
          </div>

          <h3>Description</h3>
          <div>
            <input
              onChange={handleChange}
              className="ImputDescript"
              name="description"
              placeholder="Description"
              required
            />
            <h3>Country</h3>
            <input
              onChange={handleChange}
              className="imputCountry"
              name="country"
              placeholder="Country"
              required
            />
          </div>
          
        </div>

        
        <div className="boton">
          <input className="btn" type="submit" value="Add" />
        </div>
      </form>
    </div>
  );
};

export default Form;
