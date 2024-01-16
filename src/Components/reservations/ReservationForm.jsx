import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthUser, useAuthHeader } from 'react-auth-kit';
import Navbar from '../Navbar';

function ReservationForm() {
  const [reservationDate, setReservationDate] = useState('');
  const [setupConfig, setSetupConfig] = useState('');
  const [platform, setPlatform] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAuthUser();
  const header = useAuthHeader();

  const gameId = new URLSearchParams(location.search).get('gameId');
  const { userId } = auth();

  useEffect(() => {
    if (!userId) {
      console.log('Please log in to make a reservation.');
      navigate('/login');
    }
  }, [userId, navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const reservationData = {
      reservation: {
        game_id: gameId,
        user_id: userId,
        reservation_date: reservationDate,
        setup_config: setupConfig,
        platform,
        status: 'Pending',
      },
    };

    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_API_URL}/api/reservations`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-USER-EMAIL': auth().userEmail,
          'X-USER-TOKEN': header().split(' ')[1],
        },
        body: JSON.stringify(reservationData),
      });

      if (response.ok) {
        navigate('/reservations');
      }
    } catch (error) {
    }
  };

  return (
    <>
      <Navbar />
      <div className="body-background">
        <div className="formcontainer">
          <h2>Make New Reservation</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="date">
                Reservation Date:
                <input
                  type="date"
                  value={reservationDate}
                  onChange={(e) => setReservationDate(e.target.value)}
                />
              </label>
            </div>
            <div>
              <label htmlFor="setup_config">
                PC Setup:
                <input
                  type="text"
                  value={setupConfig}
                  onChange={(e) => setSetupConfig(e.target.value)}
                />
              </label>
            </div>
            <div>
              <label htmlFor="platform">
                Platform:
                <select value={platform} onChange={(e) => setPlatform(e.target.value)}>
                  <option value="">Select Platform</option>
                  <option value="PC">PC</option>
                  <option value="Xbox Series S/X">Xbox Series S/X</option>
                  <option value="PS4">PS4</option>
                  <option value="PS5">PS5</option>
                  <option value="Nintendo Switch">Nintendo Switch</option>
                  <option value="iOS">iOS</option>
                  <option value="Android">Android</option>
                </select>
              </label>
            </div>
            <button type="submit">Reserve</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default ReservationForm;
