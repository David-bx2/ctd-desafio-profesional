
import { useState, useRef} from "react";
import { DateRange } from "react-date-range";
import { addDays } from "date-fns";
import axios from "axios";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import "../styles/SearchBlock.css";
import { es } from "date-fns/locale"; 

const SearchBlock = ({ onSearchResults }) => {
  const [keyword, setKeyword] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const debounceRef = useRef(null);
  const [selectionRange, setSelectionRange] = useState({
    startDate: new Date(),
    endDate: addDays(new Date(), 1),
    key: "selection",
  });

  const handleSelect = (ranges) => {
    setSelectionRange(ranges.selection);
  };

  const handleKeywordChange = (e) => {
    const value = e.target.value;
    setKeyword(value);

    // Cancelamos cualquier llamada previa
    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (value.length >= 2) {
      debounceRef.current = setTimeout(() => {
        axios
          .get(`http://localhost:8080/api/products/search?keyword=${value}`)
          .then((res) => setSuggestions(res.data.map(p => p.name)))
          .catch((err) => console.error("Error en autocompletado:", err));
      }, 400); // Espera 400ms antes de hacer la petición
    } else {
      setSuggestions([]);
    }
  };

  const handleSearch = async () => {
    try {
      const { startDate, endDate } = selectionRange;

      const [keywordRes, dateRes] = await Promise.all([
        axios.get(`http://localhost:8080/api/products/search?keyword=${keyword}`),
        axios.get("http://localhost:8080/api/products/available", {
          params: {
            start: startDate.toISOString().split("T")[0],
            end: endDate.toISOString().split("T")[0],
          },
        }),
      ]);

      // Intersección de resultados
      const filtered = keywordRes.data.filter(product =>
        dateRes.data.some(p => p.id === product.id)
      );

      onSearchResults(filtered);
    } catch (err) {
      console.error("Error realizando la búsqueda:", err);
    }
  };

  return (
    <div className="search-block">
      <h2>Busca el auto ideal para tus fechas</h2>
      <p>Encuentra el vehículo perfecto según tus necesidades y disponibilidad.</p>

      <div className="search-fields">
        <div className="keyword-input">
          <input
            type="text"
            placeholder="Buscar por nombre, descripción..."
            value={keyword}
            onChange={handleKeywordChange}
          />
          {suggestions.length > 0 && (
            <ul className="autocomplete-suggestions">
              {suggestions.map((s, i) => (
                <li key={i} onClick={() => setKeyword(s)}>{s}</li>
              ))}
            </ul>
          )}
        </div>

        <div className="calendar-wrapper">
          <DateRange
            ranges={[selectionRange]}
            onChange={handleSelect}
            minDate={new Date()}
            rangeColors={["#ffa500"]}
            locale={es}
          />
        </div>

        <button className="search-btn" onClick={handleSearch}>
          Realizar búsqueda
        </button>
      </div>
    </div>
  );
};

export default SearchBlock;
