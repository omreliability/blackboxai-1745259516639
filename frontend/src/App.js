import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Pumps from './pages/Pumps';
import Motors from './pages/Motors';
import Blowers from './pages/Blowers';
import Gearbox from './pages/Gearbox';
import Profile from './pages/Profile';
import Login from './pages/Login';
import { AuthContext, AuthProvider } from './context/AuthContext';

function PrivateRoute({ children }) {
  const { user } = useContext(AuthContext);
  return user ? children : <Navigate to="/login" replace />;
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/*"
            element={
              <PrivateRoute>
                <Layout>
                  <Routes>
                    <Route path="/" element={<Navigate to="/pumps" replace />} />
                    <Route path="/pumps" element={<Pumps />} />
                    <Route path="/motors" element={<Motors />} />
                    <Route path="/blowers" element={<Blowers />} />
                    <Route path="/gearbox" element={<Gearbox />} />
                    <Route path="/profile" element={<Profile />} />
                  </Routes>
                </Layout>
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
