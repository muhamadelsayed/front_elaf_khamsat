// src/components/Navbar.jsx
import { Link, useNavigate } from 'react-router-dom';
import { FiLogIn, FiLogOut, FiUserPlus, FiPlusCircle } from 'react-icons/fi';

const Navbar = () => {
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  const logoutHandler = () => {
    localStorage.removeItem('userInfo');
    navigate('/');
    window.location.reload(); // لتحديث حالة Navbar فورًا
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">منصة تجريبيه للاستاذ Elaf</Link>
      </div>
      <div className="navbar-user">
        {userInfo ? (
          <>
          <Link to="/my-orders">طلباتي</Link> 
            {userInfo.role === 'admin' && (
              <Link to="/add-summary" title="إضافة ملخص جديد">
                <FiPlusCircle size={22} />
              </Link>
            )}
            <span>أهلاً, {userInfo.name}</span>
            <button onClick={logoutHandler} title="تسجيل الخروج">
              <FiLogOut size={22} />
            </button>
          </>
        ) : (
          <div className='navbar-links'>
            <Link to="/login"><FiLogIn /> دخول</Link>
            <Link to="/register"><FiUserPlus /> تسجيل</Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;