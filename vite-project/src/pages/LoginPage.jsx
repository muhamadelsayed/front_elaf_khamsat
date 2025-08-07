// src/pages/LoginPage.jsx
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import api from '../api'; // استيراد ملف api.js
const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const navigate = useNavigate();

  // التحقق مما إذا كان المستخدم مسجل دخوله بالفعل
  useEffect(() => {
    if (localStorage.getItem('userInfo')) {
      navigate('/');
    }
  }, [navigate]);


  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const { data } = await api.post('/auth/login', { email, password });

      // حفظ بيانات المستخدم في التخزين المحلي للمتصفح
      localStorage.setItem('userInfo', JSON.stringify(data));
      
      setLoading(false);
      navigate('/'); // إعادة التوجيه إلى الصفحة الرئيسية بعد النجاح
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || 'فشل تسجيل الدخول');
    }
  };

  return (
  <div className="form-container">
    <h1>تسجيل الدخول</h1>
    {error && <p className="alert-error">{error}</p>}
    <form onSubmit={submitHandler}>
      <div className="form-group">
        <label>البريد الإلكتروني:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
      <div className="form-group">
        <label>كلمة المرور:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </div>
      <button type="submit" disabled={loading} className="btn">
        {loading ? 'جاري الدخول...' : 'دخول'}
      </button>
    </form>
    <p style={{textAlign: 'center', marginTop: '1rem'}}>
      ليس لديك حساب؟ <Link to="/register">أنشئ حسابًا جديدًا</Link>
    </p>
  </div>
);
};

export default LoginPage;