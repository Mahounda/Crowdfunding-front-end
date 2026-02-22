import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  
// Load token on startup
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  const login = (tokenValue) => {
     // Save token to localStorage
    localStorage.setItem("token", tokenValue);
  // Update React state
    setToken(tokenValue);
  };

  const logout = () => {
  // Remove token from localStorage
  localStorage.removeItem("token");

  // Clear React state
  setToken(null);
};


  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}


