import React from 'react';

const Banner = () => {
  return (
    
    <div className="containerBanner">
      <div className="bannerContent">
        <p className="bannertitel">Ontdek de nieuwste film</p>
        <div className="movieInfo">
          <p className="title">The Nun 2</p>
          <div className="additionalInfo">
            <p className="genre">Horror</p>
            <p className="jaar">2023</p> {/* Gebruik kleine letters voor variabelen/prop-namen */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Banner;
