// src/pages/HomePage.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import SummaryCard from '../components/SummaryCard';

const HomePage = () => {
  const [summaries, setSummaries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // جلب بيانات المستخدم لتحديد الملخصات المشتراة
  const [userInfo, setUserInfo] = useState(JSON.parse(localStorage.getItem('userInfo')));
  const [purchasedIds, setPurchasedIds] = useState(new Set());
  useEffect(() => {
    if (userInfo) {
      const fetchMyOrders = async () => {
        const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
        const { data } = await axios.get('/api/orders/myorders', config);
        const ids = new Set(data.map(order => order.summary._id));
        setPurchasedIds(ids);
      };
      fetchMyOrders();
    }
  }, [userInfo]);
  
  useEffect(() => {
    const fetchSummaries = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get('/api/summaries');
        setSummaries(data);
        setLoading(false);
      } catch (err) {
        setError('فشل في جلب الملخصات');
        setLoading(false);
      }
    };
    fetchSummaries();
  }, []);

  const handlePurchase = async (summaryId) => {
    if (!userInfo) {
      alert('الرجاء تسجيل الدخول أولاً لإتمام عملية الشراء.');
      return;
    }
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };
      await axios.post('/api/orders', { summaryId }, config);
      setPurchasedIds(prevIds => new Set(prevIds).add(summaryId));
      alert('تمت عملية الشراء بنجاح!');
    } catch (err) {
        alert(err.response?.data?.message || 'فشل في عملية الشراء');
    }
  };

  return (
    <div>
      <h1>أحدث الملخصات</h1>
      {loading ? (
        <p>جاري التحميل...</p>
      ) : error ? (
        <p className="alert-error">{error}</p>
      ) : (
        <div className="summaries-grid">
          {summaries.map((summary) => (
            <SummaryCard
        key={summary._id}
        summary={summary}
        onPurchase={handlePurchase}
        purchased={purchasedIds.has(summary._id)}
    />
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;