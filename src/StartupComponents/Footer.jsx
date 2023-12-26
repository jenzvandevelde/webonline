// Footer.jsx
import React from 'react';

const Footer = ({ setShowMore, showMore }) => {
  return (
    <div>
      <div className="bottompage" style={{ marginBottom: '20px', marginTop: '75px' }}>
        {showMore ? (
          <button onClick={() => setShowMore(false)}>Toon meer</button>
        ) : (
          <button onClick={() => setShowMore(true)}>Toon meer</button>
        )}
      </div>
    </div>
  );
}

export default Footer;
