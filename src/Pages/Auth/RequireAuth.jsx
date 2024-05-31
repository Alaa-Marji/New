// import { USER, baseURL } from "Api/Api";
// import Loading from "Pages/Loading/loading";
// import axios from "axios";
// import Cookie from "cookie-universal";
// import { useEffect, useState } from "react";
// import { Navigate, Outlet } from "react-router-dom";

// export default function RequireAuth() {
//   //User
//   const [user, setUser] = useState();
//   useEffect(() => {
//     axios.get(`${baseURL}/${USER}`, { headers: { Autherization: `Bearer ` } ,});
//     .then ((data)=> setUser(data.data));
//   }, []);
//   const cookie = Cookie();
//   const token = cookie.get("e-commerce");
//   return token ? (user==="" ?( <Loading/>):( <Outlet/>)):( <Navigate to={"login"} replace={true} />);
// }
