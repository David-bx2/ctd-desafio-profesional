import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaStar } from "react-icons/fa";

const ReviewList = ({ productId }) => {
  const [reviews, setReviews] = useState([]);
  const [average, setAverage] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const fetchReviews = async () => {
      const res = await axios.get(`http://localhost:8080/api/reviews/product/${productId}`);
      setReviews(res.data);
    };

    const fetchAverage = async () => {
      const res = await axios.get(`http://localhost:8080/api/reviews/product/${productId}/average`);
      setAverage(res.data.average);
      setCount(res.data.count);
    };

    fetchReviews();
    fetchAverage();
  }, [productId]);

  return (
    <div className="review-section mt-5">
      <h3 className="section-title">Valoraciones</h3>
      <p>
        <strong>{average} / 5</strong> ({count} reseñas)
      </p>
      {reviews.length > 0 ? (
        reviews.map((r) => (
          <div key={r.id} className="review-card p-3 border rounded mb-3">
            <div className="d-flex align-items-center mb-2">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} color={i < r.rating ? "#ffc107" : "#e4e5e9"} />
              ))}
              <span className="ms-2">{r.user.firstName} {r.user.lastName}</span>
              <span className="ms-auto text-muted">{r.date}</span>
            </div>
            {r.comment && <p className="mb-0">{r.comment}</p>}
          </div>
        ))
      ) : (
        <p>No hay valoraciones aún.</p>
      )}
    </div>
  );
};

export default ReviewList;