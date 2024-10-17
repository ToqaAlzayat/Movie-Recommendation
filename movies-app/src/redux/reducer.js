import { ADD_TO_FAVORITES,REMOVE_FROM_FAVORITES, ADD_TO_WATCH_LATER,REMOVE_FROM_WATCH_LATER } from './actions';

const initialState = {
  favorites: JSON.parse(localStorage.getItem('favorites')) || [], // Load from localStorage, or use empty array
  watchLater: JSON.parse(localStorage.getItem('watchLater')) || [], 
};

const movieReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_FAVORITES:
      if (state.favorites.find((fav) => fav.imdbID === action.payload.imdbID)) {
        console.log("Movie is already in favorites:", action.payload);
        return state; // Don't add it again
      }
      const updatedFavorites = [...state.favorites, action.payload];
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites)); // Save to localStorage
      return {
        ...state,
        favorites: updatedFavorites,
      };

      case REMOVE_FROM_FAVORITES:
      const filteredFavorites = state.favorites.filter(
        (movie) => movie.imdbID !== action.payload
      );
      localStorage.setItem('favorites', JSON.stringify(filteredFavorites)); // Update localStorage
      return {
        ...state,
        favorites: filteredFavorites,
      };

    case ADD_TO_WATCH_LATER:
      if (state.watchLater.find((watchLaterMovie) => watchLaterMovie.imdbID === action.payload.imdbID)) {
        console.log("Movie is already in watch later:", action.payload);
        return state; // Don't add it again
      }
      const updatedWatchLater = [...state.watchLater, action.payload];
      localStorage.setItem('watchLater', JSON.stringify(updatedWatchLater)); // Save to localStorage
      return {
        ...state,
        watchLater: updatedWatchLater,
      };

      case REMOVE_FROM_WATCH_LATER:
      const filteredWatchLter = state.watchLater.filter(
        (movie) => movie.imdbID !== action.payload
      );
      localStorage.setItem('watchLater', JSON.stringify(filteredWatchLter)); // Update localStorage
      return {
        ...state,
        watchLater: filteredWatchLter,
      };
    default:
      return state;
  }
};

export default movieReducer;
