import { create } from "zustand";

export const useStore = create((set) => ({
  games: [],
  setGames: (games) => set({ games }),
  addGame: (game) => set((state) => ({ games: [...state.games, game] })),
  removeGame: (id) => set((state) => ({ games: state.games.filter((game) => game.id !== id) })),
  reservations: [],
  setReservations: (reservations) => set({ reservations }),
  addReservation: (reservation) => set((state) => ({ reservations: [...state.reservations, reservation] })),
  removeReservation: (id) => set((state) => ({ reservations: state.reservations.filter((reservation) => reservation.id !== id) })),
}));