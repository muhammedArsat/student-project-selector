import React, { createContext, useEffect, useState } from "react";
import { fetchGetMe } from "../apis/AuthApis";

const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    email: null,
    role: null,
    profile: null,
    id:null,
    name: null,
  });
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      setLoading(true);
      const res = await fetchGetMe();

      setAuth({
        email: res.email,
        role: res.role,
        profile: res.profile,
        id:res.id,
        name: res.name,
      });
    } catch (err) {
      setAuth({
        email: null,
        role: null,
        profile: null,
        id:null,
        name: null,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <AuthContext.Provider value={{ ...auth, setAuth, loading, fetchUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };
export default AuthContext;
