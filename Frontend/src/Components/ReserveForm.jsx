// ReserveForm.jsx (actualizado para redirigir a una pantalla de detalles en lugar de crear reserva de una vez)
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { DateRange } from "react-date-range";
import { enUS } from "date-fns/locale";
import { addDays } from "date-fns";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

// Importamos nuestro CSS personalizado
import "../styles/ReserveForm.css";

const ReserveForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [unavailableDates, setUnavailableDates] = useState([]);
  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 1),
      key: "selection",
    },
  ]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/api/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.error("Error al obtener producto:", err);
      }
    };

    const fetchUnavailableDates = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/products/unavailable-dates", {
          params: { productId: id },
        });
        const dates = res.data.map((dateStr) => new Date(dateStr));
        setUnavailableDates(dates);
      } catch (err) {
        console.error("Error al obtener fechas ocupadas:", err);
      }
    };

    fetchProduct();
    fetchUnavailableDates();
  }, [id]);

  // Cambiamos la lógica para redirigir al detalle de reserva
  const handleNext = () => {
    // Tomamos las fechas elegidas
    const start = range[0].startDate.toISOString().split("T")[0];
    const end = range[0].endDate.toISOString().split("T")[0];

    // Redirigimos a /reservation-detail con query params
    navigate(`/reservation-detail?productId=${id}&start=${start}&end=${end}`);
  };

  if (!product) return <p>Cargando datos del producto...</p>;

  return (
    <div className="reserve-form-container">
      <div className="reserve-form-inner">
        <h2 className="text-center">Reservar: {product.name}</h2>

        <div className="calendar-wrapper">
          <DateRange
            ranges={range}
            onChange={(item) => setRange([item.selection])}
            minDate={new Date()}
            moveRangeOnFirstSelection={false}
            editableDateInputs={true}
            locale={enUS}
            disabledDates={unavailableDates}
          />
        </div>

        <div className="product-info">
          <img
            src={product.imageUrls?.[0] || "/assets/default.jpg"}
            alt={product.name}
          />
          <p>{product.description}</p>
        </div>

        <div className="button-group">
          <button className="btn btn-primary" onClick={handleNext}>
            Siguiente
          </button>
          <button className="btn btn-secondary" onClick={() => navigate(-1)}>
            Volver
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReserveForm;