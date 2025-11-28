// useSate
// useEffect
// usecontext ...

import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import toast from "react-hot-toast";

export const useAuth = () => {
  if (!AuthContext) {
    toast.error("Auth context must be use within auth provider");
  }
  return useContext(AuthContext);
};

// rules to remember while working with hooks
//* 1. hooks must be in react component or custom
//* 2. hoooks can not used conditionally

