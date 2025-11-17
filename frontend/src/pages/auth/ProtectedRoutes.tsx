
import { matchPath, Navigate, useLocation } from "react-router-dom";
import {  useSelector } from "react-redux";
// import Unauthorized from "./Unauthorized";



// export default Unauthorized
const PrivateRoute = ({ children }: { children: JSX.Element }) => {

  const {authenticated,role} = useSelector((state: any) =>{ 
    return {authenticated:state.auth?.authenticated,role:state.auth?.user?.role}});
  const location = useLocation();
  console.log("thejkfnjknjdnfvfed",location.pathname)




  // if (!authenticated) {
  //   return <Navigate to="/" replace />;
  // }
 


  

  // If authenticated, render the child route
  return children;
};

export default PrivateRoute;



