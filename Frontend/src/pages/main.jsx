import React from "react";
import "../styles/main.css";

const Main = () => {
  return (
    <main className="main-container">
      <section className="section">
        <h2>Buscador</h2>
        <p>Aquí irá el buscador de autos.</p>
      </section>

      <section className="section">
        <h2>Categorías</h2>
        <p>Aquí se mostrarán diferentes categorías de autos.</p>
      </section>

      <section className="section">
        <h2>Recomendaciones</h2>
        <p>Aquí irán las recomendaciones de autos disponibles.</p>
      </section>
    </main>
  );
};

export default Main;
