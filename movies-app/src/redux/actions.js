// Action types
export const ADD_TO_FAVORITES = 'ADD_TO_FAVORITES';
export const ADD_TO_WATCH_LATER = 'ADD_TO_WATCH_LATER';

// Action creators
export const addToFavorites = (movie) => ({
    type: ADD_TO_FAVORITES,
    payload: movie,
  });
  
export const addToWatchLater = (movie) => ({
    type: ADD_TO_WATCH_LATER,
    payload: movie,
  });
  