import React, { useState } from "react";
import axios from "axios";
import { FaStar } from "react-icons/fa";

const ReviewForm = ({ productId, userId, onReviewSubmitted }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (rating < 1 || rating > 5) {
      return setError("Selecciona una puntuación válida.");
    }

    try {
      await axios.post("http://localhost:8080/api/reviews", {
        rating,
        comment,
        date: new Date().toISOString().split("T")[0],
        user: { id: userId },
        product: { id: productId },
      });
      setRating(0);
      setComment("");
      onReviewSubmitted();
    } catch (err) {
      console.error("Error al enviar reseña", err);
      setError("Ocurrió un error al enviar la reseña.");
    }
  };

  return (
    <form className="mt-4" onSubmit={handleSubmit}>
      <h4>Deja tu valoración</h4>
      <div className="d-flex mb-3">
        {[...Array(5)].map((_, i) => (
          <FaStar
            key={i}
            size={28}
            onClick={() => setRating(i + 1)}
            color={i < rating ? "#ffc107" : "#e4e5e9"}
            style={{ cursor: "pointer" }}
          />
        ))}
      </div>
      <textarea
        className="form-control mb-3"
        rows="3"
        placeholder="Escribe un comentario (opcional)"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      ></textarea>
      {error && <div className="text-danger mb-2">{error}</div>}
      <button type="submit" className="btn btn-primary">
        Enviar reseña
      </button>
    </form>
  );
};

export default ReviewForm;
