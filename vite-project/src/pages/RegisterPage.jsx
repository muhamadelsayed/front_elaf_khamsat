// src/pages/RegisterPage.jsx

import { useState } from 'react';
import axios from 'axios'; // لاستدعاء الـ API

const RegisterPage = () => {
  // استخدام useState لتخزين قيم حقول الإدخال
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [university, setUniversity] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // حالات إضافية للتحميل وعرض الأخطاء
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // دالة تُنفذ عند إرسال النموذج
  const submitHandler = async (e) => {
    e.preventDefault(); // منع إعادة تحميل الصفحة الافتراضية للنموذج

    // التحقق من تطابق كلمتي المرور
    if (password !== confirmPassword) {
      setError('كلمتا المرور غير متطابقتين!');
      return;
    }

    setError(null); // مسح أي خطأ سابق
    setLoading(true); // بدء التحميل

    try {
      // إعداد البيانات التي سيتم إرسالها للـ API
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const body = { name, email, password, university };

      // إرسال طلب POST إلى مسار التسجيل في الواجهة الخلفية
      // لاحظ أننا نستخدم /api/... بفضل إعداد البروكسي في vite.config.js
      const { data } = await axios.post('/api/auth/register', body, config);
      
      console.log('تم التسجيل بنجاح:', data);
      setSuccess(true); // عرض رسالة النجاح
      setLoading(false); // إيقاف التحميل

      // في تطبيق حقيقي، ستقوم بحفظ التوكن data.token في مكان ما (مثل localStorage)
      // وإعادة توجيه المستخدم إلى صفحة أخرى.

    } catch (err) {
      // عرض رسالة الخطأ القادمة من الخادم
      setError(err.response && err.response.data.message ? err.response.data.message : 'حدث خطأ ما');
      setLoading(false); // إيقاف التحميل
    }
  };

return (
    <div className="form-container">
        <h1>إنشاء حساب جديد</h1>
        {error && <p className="alert-error">{error}</p>}
        {success && <p className="alert-success">تم إنشاء الحساب بنجاح!</p>}
        {loading && <p>جاري إنشاء الحساب...</p>}
        
        <form onSubmit={submitHandler}>
            <div className="form-group">
                <label>الاسم:</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </div>
            <div className="form-group">
                <label>البريد الإلكتروني:</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>
            <div className="form-group">
                <label>الجامعة:</label>
                <input
                    type="text"
                    value={university}
                    onChange={(e) => setUniversity(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label>كلمة المرور:</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
            <div className="form-group">
                <label>تأكيد كلمة المرور:</label>
                <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
            </div>
            <button type="submit" disabled={loading} className="btn">
                {loading ? 'جاري التسجيل...' : 'تسجيل'}
            </button>
        </form>
    </div>
);
};

export default RegisterPage;