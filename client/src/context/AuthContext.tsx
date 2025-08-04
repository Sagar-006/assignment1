import React, { createContext,  useEffect,  useState, type ReactNode } from "react";

interface AuthTypes {
  showPassword: boolean;
  setShowPassword: React.Dispatch<React.SetStateAction<boolean>>;
  login: boolean;
  setLogin: React.Dispatch<React.SetStateAction<boolean>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const AuthContext = createContext<AuthTypes | undefined>(undefined);
const AuthProvider = ({ children }: { children: ReactNode }) => {
  
  

  const [loading, setLoading] = useState<boolean>(true);
  const [login,setLogin] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState(false);
  

  
     useEffect(() => {
       const token = localStorage.getItem("token");
       if (token) {
         setLogin(true);
       } else {
         setLogin(false);
       }
     }, []);
  

  return (
    <AuthContext.Provider
      value={{
        
        showPassword,
        setShowPassword,
        loading,
        setLoading,
        login,
        setLogin
        
        
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
