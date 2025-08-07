import { Navigate } from 'react-router-dom';

const AdminProtectedRoute = ({ children }) => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  
  if (userInfo && userInfo.role === 'admin') {
    return children;
  }
  
  return <Navigate to="/login" />;
};

export default AdminProtectedRoute;