import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useRefreshToken from "../hooks/useRefreshToken";
import useAuth from "../hooks/useAuth";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import useLocalStorage from "../hooks/useLocalStorage";

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const { auth } = useAuth();
  const [ persist ] = useLocalStorage('persist', false);

  useEffect(() => {
    let isMounted = true;

    const verifyRefresh = async () => {
      try {
        await refresh(); //get response from refresh if token is expired
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

export default PersistLogin;
