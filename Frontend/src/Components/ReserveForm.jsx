import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { DateRange } from "react-date-range";
import { enUS } from "date-fns/locale";
import { addDays } from "date-fns";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import "../styles/ReserveForm.css";

const ReserveForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [unavailableDates, setUnavailableDates] = useState([]);
  const [phone, setPhone] = useState("");
  const [comments, setComments] = useState("");
  
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

  const handleNext = () => {
    const start = range[0].startDate.toISOString().split("T")[0];
    const end = range[0].endDate.toISOString().split("T")[0];
  
    navigate(
      `/reservation-detail?productId=${id}&start=${start}&end=${end}&phone=${encodeURIComponent(phone)}&comments=${encodeURIComponent(comments)}`
    );
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

        <div className="mt-3">
  <label htmlFor="phone"><strong>Teléfono de contacto:</strong></label>
  <input
    type="tel"
    id="phone"
    className="form-control"
    placeholder="Ej: +506 8888-8888"
    value={phone}
    onChange={(e) => setPhone(e.target.value)}
  />
</div>

<div className="mt-3">
  <label htmlFor="comments"><strong>Comentarios adicionales:</strong></label>
  <textarea
    id="comments"
    className="form-control"
    rows="3"
    placeholder="Opcional"
    value={comments}
    onChange={(e) => setComments(e.target.value)}
  />
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