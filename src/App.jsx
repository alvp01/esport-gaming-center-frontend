import React from 'react';
import {
  BrowserRouter as Router, Route, Routes,
} from 'react-router-dom';
import { AuthProvider, RequireAuth } from 'react-auth-kit';
import Login from './Components/auth/SignInForm';
import Register from './Components/auth/SignUpForm';
import AddGamesForm from './Components/games/AddGamesForm';
import Session from './Components/session/Session';
import MainPage from './Components/games/MainPage';
import DeleteGame from './Components/games/DeleteGame';
import Reservations from './Components/reservations/Reservations';
import GameDetails from './Components/details/GameDetails';
import './App.css';/* eslint-disable */
import GamesListComponent from './Components/games/GamesListComponent';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ParentComponent from './Components/reservations/ReservationForm';

const App = () => {
  const routes = [
    {
      path: '/',
      element: <Session />,
      requiresAuth: false,
    },
    {
      path: '/login',
      element: <Login />,
      requiresAuth: false,
    },
    {
      path: '/register',
      element: <Register />,
      requiresAuth: false,
    },
    {
      path: '/games',
      element: <MainPage />,
      requiresAuth: true,
    },
    {
      path: '/addGame',
      element: <AddGamesForm />,
      requiresAuth: true,
    },
    {
      path: '/gamelist',
      element: <GamesListComponent />,
      requiresAuth: true,
    },
    {
      path: '/details/:gameId',
      element: <GameDetails />,
      requiresAuth: true,
    },
    {
      path: '/games/delete',
      element: <DeleteGame />,
      requiresAuth: true,
    },
    {
      path: '/reservations',
      element: <Reservations />,
      requiresAuth: true,
    },
    {
      path: '/reservations/new',
      element: <ParentComponent />,
      requiresAuth: true,
    }
  ]

  return (
  
    <AuthProvider
      authType="cookie"
      authName="_auth"
      cookieDomain={window.location.hostname}
      cookieSecure={false}
    >
      <Router>
        <Routes>
          {routes.map((route) => {
            return (
              <Route
                path={route.path}
                element={
                  route.requiresAuth ? <RequireAuth loginPath="/login">{route.element}</RequireAuth> : route.element
                } />
            )
          })}
        </Routes>
      </Router>
    </AuthProvider>
  );
} 

export default App;
