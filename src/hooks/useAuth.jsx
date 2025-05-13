import React, { useContext } from "react";
import { AuthContext } from "../router/AuthProvider";

const useAuth = () => {
  const authUser = useContext(AuthContext);
  return authUser;
};

export default useAuth;
