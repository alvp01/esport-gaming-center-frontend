import React, { useState, useEffect } from 'react';
import DeleteGame from '../games/DeleteGame';

function GamePage() {


  return (
    <div>
      <h2>Game Page</h2>
      <ul>
        {games.map((game) => (
          <li key={game.id}>
            <strong>{game.title}</strong>
            :
            {game.description}
            <img src={game.imageUrl} alt={game.title} />
            <DeleteGame gameId={game.id} onDelete={() => handleDelete(game.id)} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default GamePage;
