import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth, AuthContextType } from '../uitls/useAuth';

const Login: React.FC = () => {
  const { login, isLoggedIn }: AuthContextType = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    login();
    navigate('/order');
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/order');
    }
  }, [isLoggedIn, navigate]);

  return (
    <div className="login-card">
      <h2>Login Page</h2>
      <button className="login-btn" type="submit" onClick={handleLogin}>
        Login
      </button>
    </div>
  );
};

export default Login;
