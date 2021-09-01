import jsonwebtoken from "jsonwebtoken";
//import { useHistory } from "react-router-dom";
const { REACT_APP_SECRET } = process.env;
export const verifyToken = (token) => {
    //const history = useHistory()
  try {
    const decoded = jsonwebtoken.verify(token, REACT_APP_SECRET);
    
    return decoded.rol;
  } catch (error) {
    sessionStorage.removeItem("token");
    //history.push("/");
  }
};
