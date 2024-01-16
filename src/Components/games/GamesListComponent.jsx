import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuthUser } from 'react-auth-kit';
import './GamesListComponent.css';
import background from '../../assets/background.webp';
import Navbar from '../Navbar';

function GamesListComponent() {
  const [games, setGames] = useState([]);
  const navigate = useNavigate();
  const auth = useAuthUser();

  const fetchGames = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_API_URL}/api/games`);
      setGames(response.data);
    } catch (error) {
    }
  };

  useEffect(() => {
    fetchGames();
  }, []);

  const deleteGame = async (gameId, event) => {
    event.stopPropagation();
    try {
      await axios.delete(`${process.env.BASE_API_URL}/api/games/${gameId}`);
      fetchGames();
    } catch (error) {
      console.error(error);
    }
  };

  const handleGameClick = (gameId) => {
    navigate(`/details/${gameId}`);
  };

  if (!auth().isAdmin) {
    return <Navigate to="/games" />;
  }

/* eslint-disable */
  return (
    <>
      <Navbar />
      <div className="games-list-container" style={{ backgroundImage: `url(${background})` }}>
        <button type="button" className="new-game-button" onClick={() => navigate('/addgame')}>New Game</button>
        <ul className="games-list">
          {games.map((game) => (
            <li key={game.id} className="game-list-item" onClick={() => handleGameClick(game.id)}>
              <h3 className="game-header">{game.title}</h3>
              <p className="game-description">{game.description}</p>
              <img className="game-image" src={game.image_url} alt={game.title} />
              <button className="delete-button" onClick={(e) => deleteGame(game.id, e)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default GamesListComponent;
