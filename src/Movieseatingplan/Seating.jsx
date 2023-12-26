import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styles from '../assets/seating.module.css';

function Seating() {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [seatingData, setSeatingData] = useState([]);
  const [movieInfo, setMovieInfo] = useState({
    title: '',
    price: 0,
    image: '',
  });
  const location = useLocation();

  // Function to generate random seating data
  const generateRandomSeatingData = (rows, columns, soldChance = 0.3) => {
    return Array.from({ length: rows }, () =>
      Array.from({ length: columns }, () => (Math.random() < soldChance ? 0 : 1))
    );
  };

  useEffect(() => {
    if (location.state && location.state.movie) {
      const { title, thumbnail: image } = location.state.movie;
      setMovieInfo({ ...movieInfo, title, image, price: 12 }); // Adjust the price as needed
    }

    // Random seating data generation
    setSeatingData(generateRandomSeatingData(6, 10, 0.3)); // Adjust rows, columns, and sold chance as needed
  }, [location]);

  const handleSeatClick = (rowIndex, seatIndex) => {
    const updatedSelectedSeats = [...selectedSeats];
    const seatId = `${rowIndex}-${seatIndex}`;

    if (updatedSelectedSeats.includes(seatId)) {
      updatedSelectedSeats.splice(updatedSelectedSeats.indexOf(seatId), 1);
    } else {
      updatedSelectedSeats.push(seatId);
    }

    setSelectedSeats(updatedSelectedSeats);
    setTotalPrice(updatedSelectedSeats.length * movieInfo.price);
  };

  const renderSeatingRows = () => {
    return seatingData.map((row, rowIndex) => (
      <div className={styles.row} key={rowIndex}>
        {row.map((seat, seatIndex) => (
          <div
            className={`${styles.seat} ${seat === 0 ? styles.sold : ''} ${
              selectedSeats.includes(`${rowIndex}-${seatIndex}`) ? styles.selected : ''
            }`}
            key={seatIndex}
            onClick={() => {
              if (seat !== 0) {
                handleSeatClick(rowIndex, seatIndex);
              }
            }}
          ></div>
        ))}
      </div>
    ));
  };

  return (
    <div className={styles.movieContainer}>
      <div className={styles.movieInfo}>
        <p className={styles.whiteTitle}>{movieInfo.title}</p>
        <img src={movieInfo.image} alt={movieInfo.title} />
      </div>
      <div className={styles.seatinglineup}>
        <ul className={styles.showcase}>
          <li>
            <div className={styles.seat}></div>
            <small>Available</small>
          </li>
          <li>
            <div className={`${styles.seat} ${styles.selected}`}></div>
            <small>Selected</small>
          </li>
          <li>
            <div className={`${styles.seat} ${styles.sold}`}></div>
            <small>Sold</small>
          </li>
        </ul>
      </div>
      <div className={styles.screen}>
        <p className={styles.screentext}>Scherm</p>
      </div>
      <div className={styles.seatingplan}>
        {renderSeatingRows()}
        <p className={styles.text}>
          Je hebt <span id="count">{selectedSeats.length}</span> stoelen voor een prijs van €
          <span id="total">{totalPrice}</span>
        </p>
      </div>
      <button className={styles.orderingbutton}>Bestellen</button>
    </div>
  );
}

export default Seating;
