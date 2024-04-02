import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { AuthProvider } from './uitls/useAuth';
import PrivateRoute from './uitls/ProtectedRoute';
import Login from './components/Login';
import Order from './components/Order';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/" element={<PrivateRoute />}>
            <Route path="/order" element={<Order />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
