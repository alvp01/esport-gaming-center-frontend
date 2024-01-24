import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useAuthUser, useAuthHeader } from 'react-auth-kit';
import GameCarousel from './GameCarousel';
import { fetchGames } from '../../redux/fts/gamesSlice';
import '../../assets/css/carousel.css';
import Navbar from '../Navbar';

function MainPage() {
  const dispatch = useDispatch();
  const { games } = useSelector((state) => state.games);
  const auth = useAuthUser();
  const header = useAuthHeader();

  useEffect(() => {
    dispatch(fetchGames(auth().userEmail, header().split(' ')[1]));
  }, [dispatch]);

  return (
    <>
      <Navbar />
      <div className="main-page-container">
        <h1 className="main-title">Esport Gaming Center</h1>
        <GameCarousel games={games} />
      </div>
    </>
  );
}

export default MainPage;
