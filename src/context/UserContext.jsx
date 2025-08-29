// context/UserContext.js
import { createContext, useContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  // ✅ user بيكون null لو مفيش حد عامل تسجيل دخول
  const [user, setUser] = useState(null);

  // ✅ تسجيل الدخول
  const login = (userData) => {
    setUser(userData); // userData هي البيانات اللي جايه من الفورم (اسم + ايميل..)
  };

  // ✅ تسجيل الخروج
  const logout = () => {
    setUser(null); // يمسح بيانات اليوزر
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
