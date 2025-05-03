// import { Navigate, useLocation } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';

// export default function PrivateRoute({ children }) {
//   const { user, loading } = useAuth();
//   const location = useLocation();

//   if (loading) return <div className="text-center mt-10">Loading...</div>;

//   return user ? children : <Navigate to="/login" state={{ from: location }} replace />;
// }



import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

export default function PrivateRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>; // Optional loading state

  return user ? children : <Navigate to="/login" />;
}
