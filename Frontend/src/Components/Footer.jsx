import "../styles/Footer.css";
import logo from "../Components/assets/logo.png";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <img src={logo} alt="Logo de la empresa" className="footer-logo" />
        <p>
          &copy; {new Date().getFullYear()} Los Mejores Autos - Todos los
          derechos reservados
        </p>
      </div>
    </footer>
  );
};

export default Footer;
