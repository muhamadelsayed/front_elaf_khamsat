// src/pages/MyOrdersPage.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const MyOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  useEffect(() => {
    const fetchMyOrders = async () => {
      try {
        const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
        const { data } = await axios.get('/api/orders/myorders', config);
        setOrders(data);
        setLoading(false);
      } catch (err) {
        setError('فشل في جلب الطلبات');
        setLoading(false);
      }
    };
    fetchMyOrders();
  }, [userInfo.token]);

  return (
    <div className="orders-container">
      <h1>طلباتي</h1>
      {loading ? <p>جاري التحميل...</p> : error ? <p className="alert-error">{error}</p> : (
        <table className="orders-table">
          <thead>
            <tr>
              <th>عنوان الملخص</th>
              <th>التاريخ</th>
              <th>السعر</th>
              <th>الحالة</th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 ? (
              <tr><td colSpan="4">لم تقم بشراء أي ملخصات بعد. <Link to="/">تصفح الملخصات</Link></td></tr>
            ) : (
              orders.map(order => (
                <tr key={order._id}>
                  <td>{order.summary?.title || 'ملخص محذوف'}</td>
                  <td>{new Date(order.createdAt).toLocaleDateString('ar-EG')}</td>
                  <td>{order.price} ريال</td>
                  <td><span className="status-completed">مكتمل</span></td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MyOrdersPage;