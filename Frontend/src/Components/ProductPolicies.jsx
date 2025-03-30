import React from "react";

const ProductPolicies = () => {
  return (
    <div className="product-policies mt-5">
      <h3 className="section-title">Políticas del Vehículo</h3>
      <div className="row">
        <div className="col-md-4">
          <h5>Uso Responsable</h5>
          <p>
            El vehículo debe ser conducido por el titular de la reserva y con
            licencia válida. No se permite el uso en competencias ni actividades
            ilegales.
          </p>
        </div>
        <div className="col-md-4">
          <h5>Combustible y Mantenimiento</h5>
          <p>
            El vehículo debe devolverse con el mismo nivel de combustible. No es
            necesario realizar mantenimiento, pero se espera cuidado razonable.
          </p>
        </div>
        <div className="col-md-4">
          <h5>Política de Cancelación</h5>
          <p>
            Las cancelaciones se aceptan hasta 24 horas antes del inicio de la
            reserva. Cancelaciones tardías pueden estar sujetas a cargos.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductPolicies;
