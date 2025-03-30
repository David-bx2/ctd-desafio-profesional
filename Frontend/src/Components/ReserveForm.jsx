// ReserveForm.jsx (reemplazando estilos inline por ReserveForm.css)
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
  const [message, setMessage] = useState("");

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

  const handleReserve = async () => {
    try {
      const start = range[0].startDate.toISOString().split("T")[0];
      const end = range[0].endDate.toISOString().split("T")[0];

      await axios.post("http://localhost:8080/api/bookings", null, {
        params: { productId: id, start, end },
      });

      setMessage("Reserva creada con éxito.");
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data || "Error al crear la reserva");
    }
  };

  if (!product) return <p>Cargando datos del producto...</p>;

  return (
    <div className="reserve-form-container">
      <div className="reserve-form-inner">
        <h2 className="text-center">Reservar: {product.name}</h2>
        {message && <div className="alert alert-info text-center">{message}</div>}

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
          <button className="btn btn-dark" onClick={handleReserve}>
            Confirmar Reserva
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