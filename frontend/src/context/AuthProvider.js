import { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [IsAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const dummy = "dummy";
  const headers = {
    "Content-Type": "application/json",
  };

  useEffect(() => {
    setLoading(true);
    const verifyCookie = async () => {
      console.log("yooo");
      try {
        const result = await axios.post(
          "/api/auth/verify",
          "",
          {
            headers: headers,
          },
          { withCredentials: true }
        );
        const email = result.data.email;
        setAuth({ user: email });
        if (result.data.role === "admin") setIsAdmin(true);
        setLoading(false);
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    };
    verifyCookie();
  }, []);

  const logIn = async (user) => {
    setLoading(true);
    try {
      const result = await axios.post(
        "/api/login",
        user,
        {
          headers: headers,
        },
        { withCredentials: true }
      );

      const email = result.data.email;
      setAuth({ user: email });
      if (result.data.role == "admin") setIsAdmin(true);
      setLoading(false);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };
  const logout = async()=>{
    setLoading(true);
    try{
      const result = await axios.post(
      "/api/logout"
      )
      setAuth({});
      setIsAdmin(false);
      setLoading(false);
    }
    catch(e)
    {
    console.log(e)
    }
    finally{
      setLoading(false);
    }
  }
  return (
    <AuthContext.Provider
      value={{ auth, setAuth, dummy, logIn, loading, IsAdmin, setIsAdmin,logout }}>
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthContext;
