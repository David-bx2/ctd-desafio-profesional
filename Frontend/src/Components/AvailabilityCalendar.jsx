import { useEffect, useState } from "react";
import { DateRange } from "react-date-range";
import axios from "axios";
import { addDays } from "date-fns";
import { es } from "date-fns/locale"; // ✅ Soporte para español
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

const AvailabilityCalendar = ({ productId }) => {
  const [unavailableDates, setUnavailableDates] = useState([]);
  const [error, setError] = useState(null);
  const [reloadTrigger, setReloadTrigger] = useState(0);

  useEffect(() => {
    const fetchUnavailableDates = async () => {
      try {
        setError(null);
        const res = await axios.get(
          `http://localhost:8080/api/products/unavailable-dates?productId=${productId}`
        );
        setUnavailableDates(res.data.map((date) => new Date(date)));
      } catch (err) {
        console.error("Error al obtener disponibilidad:", err);
        setError(
          "No se pudo obtener la disponibilidad. Intenta nuevamente más tarde."
        );
      }
    };

    fetchUnavailableDates();
  }, [productId, reloadTrigger]);

  const isDateDisabled = (date) => {
    return unavailableDates.some(
      (d) => d.toDateString() === date.toDateString()
    );
  };

  return (
    <div className="mt-3">
      {error ? (
        <div className="alert alert-danger text-center">
          <p>{error}</p>
          <button
            className="btn btn-outline-danger"
            onClick={() => setReloadTrigger((prev) => prev + 1)}
          >
            Reintentar
          </button>
        </div>
      ) : (
        <DateRange
          editableDateInputs={false}
          onChange={() => {}}
          moveRangeOnFirstSelection={false}
          ranges={[
            {
              startDate: new Date(),
              endDate: addDays(new Date(), 1),
              key: "selection",
            },
          ]}
          minDate={new Date()}
          disabledDates={unavailableDates}
          locale={es}
        />
      )}
    </div>
  );
};

export default AvailabilityCalendar;
