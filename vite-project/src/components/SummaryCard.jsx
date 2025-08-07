// src/components/SummaryCard.jsx
import { FiCheckCircle } from 'react-icons/fi';

const SummaryCard = ({ summary, onPurchase, purchased }) => {
  return (
    <div className="summary-card">
      <div>
        <h3>{summary.title}</h3>
        <p className="summary-card-meta">المادة: {summary.courseName}</p>
        <p className="summary-card-meta">الجامعة: {summary.university}</p>
        <small className="summary-card-meta">بواسطة: {summary.uploader?.name || 'مستخدم'}</small>
      </div>
      <div className="summary-card-footer">
        <span className="summary-card-price">{summary.price} ريال</span>
        {purchased ? (
          <button className="btn-purchased" disabled>
            <FiCheckCircle /> تم الشراء
          </button>
        ) : (
          <button className="btn btn-buy" onClick={() => onPurchase(summary._id)}>
            شراء
          </button>
        )}
      </div>
    </div>
  );
};

export default SummaryCard;