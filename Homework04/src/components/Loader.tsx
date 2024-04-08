import React from 'react';
import '../styles/Loader.css'; 

function BouncingLoader() {
  return (
    <section className="section-loader">
      <article>
        <div className="o-pokeball c-loader u-pulse"></div>
      </article>
    </section>
  );
}

export default BouncingLoader;
