import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

function FindGameComponent({ handleFormChange }) {
  const [games, setGames] = useState([]);

  const fetchGames = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_API_URL}/api/games`);
      const data = await response.json();
      if (response.ok) {
        setGames(data);
      } else {
        console.error('Error fetching games:', data);
      }
    } catch (error) {
      console.error('Error fetching games:', error);
    }
  };

  useEffect(() => {
    fetchGames();
  }, []);

  return (
    <label htmlFor="game">
      Choose a game:
      <select id="game" name="game_id" onChange={handleFormChange}>
        <option value="">Select a Game</option>
        {games.map((game) => (
          <option key={game.id} value={game.id}>
            {game.title}
          </option>
        ))}
      </select>
    </label>
  );
}

FindGameComponent.propTypes = {
  handleFormChange: PropTypes.func.isRequired,
};

export default FindGameComponent;
