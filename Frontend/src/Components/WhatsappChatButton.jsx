import { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import toast from "react-hot-toast";
import "../styles/WhatsappChatButton.css";

const WhatsappChatButton = () => {
  const [loading, setLoading] = useState(false);

  const phoneNumber = "52123456789";
  const message = encodeURIComponent(
    "Hola, tengo una consulta sobre uno de los vehículos en la plataforma."
  );

  const handleClick = () => {
    setLoading(true);
    const url = `https://wa.me/${phoneNumber}?text=${message}`;

    try {
      window.open(url, "_blank");
      toast.success("Redirigiendo a WhatsApp...");
    } catch (err) {
      console.error("Error al abrir WhatsApp:", err);
      toast.error("No se pudo abrir WhatsApp. Verifica tu conexión.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="whatsapp-button-container">
      <button
        className="whatsapp-chat-button"
        onClick={handleClick}
        disabled={loading}
        aria-label="Chatear por WhatsApp"
      >
        <FaWhatsapp size={28} />
      </button>
    </div>
  );
};

export default WhatsappChatButton;
