import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import usePoliceRefreshToken from "../hooks/usePoliceRefreshToken";
import useAuth from "../hooks/useAuth";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import useLocalStorage from "../hooks/useLocalStorage";

const PolicePersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const policeRefresh = usePoliceRefreshToken();
  const { auth } = useAuth();
  const [ persist ] = useLocalStorage('persist', false);

  useEffect(() => {
    let isMounted = true;

    const verifyRefresh = async () => {
      try {
        await policeRefresh(); //get response from refresh if token is expired
      } catch (err) {
        console.log(err);
      } finally {
        isMounted && setIsLoading(false); //prevent infinite loop
      }
    };
    !auth?.accessToken ? verifyRefresh() : setIsLoading(false); //if no access token, verify refresh

    return () => isMounted = false;
  }, []);

  useEffect(() => {
    console.log(`isLoading: ${isLoading}`);
    console.log(`authToken: ${JSON.stringify(auth?.accessToken)}`);
  }, [isLoading]);

  return (
    <>
      {
      !persist 
      ? <Outlet />
      : isLoading 
      ? (<Box sx={{ display: "flex" }}><CircularProgress /></Box>) 
      : (<Outlet />)
      }
    </>
  );
}

export default PolicePersistLogin;
