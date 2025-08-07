// src/pages/AddSummaryPage.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddSummaryPage = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [courseName, setCourseName] = useState('');
  const [university, setUniversity] = useState('');
  const [price, setPrice] = useState(0);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const summaryData = { title, description, courseName, university, price };
      await axios.post('/api/summaries', summaryData, config);
      setLoading(false);
      alert('تم إضافة الملخص بنجاح!');
      navigate('/');
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || 'فشل في إضافة الملخص');
    }
  };

  return (
    <div className="form-container">
      <h1>إضافة ملخص جديد</h1>
      {error && <p className="alert-error">{error}</p>}
      <form onSubmit={submitHandler}>
        <div className="form-group"><label>العنوان:</label><input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required /></div>
        <div className="form-group"><label>الوصف:</label><input type="text" value={description} onChange={(e) => setDescription(e.target.value)} required /></div>
        <div className="form-group"><label>اسم المادة:</label><input type="text" value={courseName} onChange={(e) => setCourseName(e.target.value)} required /></div>
        <div className="form-group"><label>الجامعة:</label><input type="text" value={university} onChange={(e) => setUniversity(e.target.value)} required /></div>
        <div className="form-group"><label>السعر (ريال):</label><input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required /></div>
        <button type="submit" disabled={loading} className="btn">
          {loading ? 'جاري الإضافة...' : 'إضافة الملخص'}
        </button>
      </form>
    </div>
  );
};

export default AddSummaryPage;