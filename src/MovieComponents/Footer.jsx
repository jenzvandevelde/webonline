// Footer.jsx
import React from 'react';

const Footer = ({ setShowMore, showMore }) => {
  return (
    <div>
      <div className="bottompage" style={{ marginBottom: '20px', marginTop: '75px' }}>
        <button onClick={() => setShowMore(!showMore)}>
          {showMore ? "Toon minder" : "Toon meer"}
        </button>
      </div>
    </div>
  );
}

export default Footer;
