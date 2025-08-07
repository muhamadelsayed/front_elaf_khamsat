// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Navbar from './components/Navbar'; // استيراد Navbar
import AddSummaryPage from './pages/AddSummaryPage';
import AdminProtectedRoute from './components/AdminProtectedRoute';

import MyOrdersPage from './pages/MyOrdersPage';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route 
            path="/add-summary" 
            element={
              <AdminProtectedRoute>
                <AddSummaryPage />
              </AdminProtectedRoute>
            } 
          />
          <Route 
            path="/my-orders"
            element={
              <ProtectedRoute>
                <MyOrdersPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
    </Router>
  );
}

export default App;