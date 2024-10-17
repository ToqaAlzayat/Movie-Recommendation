// Action types
export const ADD_TO_FAVORITES = 'ADD_TO_FAVORITES';
export const ADD_TO_WATCH_LATER = 'ADD_TO_WATCH_LATER';
export const REMOVE_FROM_FAVORITES = 'REMOVE_FROM_FAVORITES';
export const REMOVE_FROM_WATCH_LATER = 'REMOVE_FROM_WATCH_LATER';

// Action creators
export const addToFavorites = (movie) => ({
    type: ADD_TO_FAVORITES,
    payload: movie,
  });
  
export const addToWatchLater = (movie) => ({
    type: ADD_TO_WATCH_LATER,
    payload: movie,
  });

export const removeFromFavorites = (imdbID) => ({
    type: REMOVE_FROM_FAVORITES,
    payload: imdbID,
});
export const removeFromWATCH_LATER = (imdbID) => ({
  type: REMOVE_FROM_WATCH_LATER,
  payload: imdbID,
});

  