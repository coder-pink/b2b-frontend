import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import AdminPanel from './pages/AdminPanel';
import ManufacturerDetails from './pages/ManufacturerDetails';
import PrivateRoute from './components/PrivateRoute';
import { AuthProvider } from './context/AuthContext';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={<PrivateRoute><Home /></PrivateRoute>}
            // element={<Home />}
          />
          <Route
            path="/manufacturer/:id"
            element={<PrivateRoute><ManufacturerDetails /></PrivateRoute>}
            // element={<ManufacturerDetails />}
          />
          <Route path="/admin" 
            // element={<PrivateRoute><AdminPanel /></PrivateRoute>}
            element={<AdminPanel />}
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
