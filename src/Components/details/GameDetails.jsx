import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { fetchGameById } from '../../redux/fts/gamesSlice';
import '../../assets/css/carousel.css';

function GameDetails() {
  const dispatch = useDispatch();
  const { gameId } = useParams();
  const gameDetails = useSelector((state) => state.games.gameById);

  useEffect(() => {
    dispatch(fetchGameById(gameId));
  }, [dispatch, gameId]);

  return (
    <div>
      <h2 className="headerDetails">Game Details</h2>
      {gameDetails.isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="Details">
          <img src={gameDetails.image_url} alt={gameDetails.title} />
          <h3>{gameDetails.title}</h3>
          <p>
            Description:
            {gameDetails.description}
          </p>
          <Link to={`/reservations/new?gameId=${gameId}`} className="reserveButton">
            Reserve Game
          </Link>
        </div>
      )}
    </div>
  );
}

export default GameDetails;
