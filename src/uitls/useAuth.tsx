import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from 'react';

export interface AuthContextType {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const getValue = (): boolean => {
      try {
        const item = window.localStorage.getItem('isLogin');
        return item ? JSON.parse(item) : false;
      } catch (error) {
        console.error(error);
        return false;
      }
    };

    const isLogin = getValue();
    if (isLogin) setIsLoggedIn(true);
  }, []);

  const login = () => {
    try {
      setIsLoggedIn(true);
      window.localStorage.setItem('isLogin', JSON.stringify(true));
    } catch (error) {
      console.error(error);
    }
  };

  const logout = () => {
    try {
      setIsLoggedIn(false);
      window.localStorage.setItem('isLogin', JSON.stringify(false));
    } catch (error) {
      console.error(error);
    }
  };

  const value: AuthContextType = { isLoggedIn, login, logout };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};
