import { API_URL } from "../../config/api";

import {
  GENRES_LOADING,
  GENRES_SUCCESS,
  GENRE_LOADING,
  GENRE_SUCCESS,
  LOGIN_LOADING,
  LOGIN_SUCCESS,
  MOVIES_LOADING,
  MOVIES_SUCCESS,
  MOVIE_LOADING,
  MOVIE_SUCCESS,
  REGISTER_LOADING,
  REGISTER_SUCCESS,
} from "./actionType";

export const fetchMoviesSuccess = (payload) => {
  return {
    type: MOVIES_SUCCESS,
    payload,
  };
};

export const fetchMoviesLoading = (payload) => {
  return {
    type: MOVIES_LOADING,
    payload,
  };
};

export const fetchMovieDetailsSuccess = (payload) => {
  return {
    type: MOVIE_SUCCESS,
    payload,
  };
};

export const fetchMovieDetailsLoading = (payload) => {
  return {
    type: MOVIE_LOADING,
    payload,
  };
};

export const fetchGenresSuccess = (payload) => {
  return {
    type: GENRES_SUCCESS,
    payload,
  };
};

export const fetchGenresLoading = (payload) => {
  return {
    type: GENRES_LOADING,
    payload,
  };
};

export const fetchGenreDetailsSuccess = (payload) => {
  return {
    type: GENRE_SUCCESS,
    payload,
  };
};

export const fetchGenreDetailsLoading = (payload) => {
  return {
    type: GENRE_LOADING,
    payload,
  };
};

export const fetchLoginSuccess = (payload) => {
  return {
    type: LOGIN_SUCCESS,
    payload,
  };
};

export const fetchLoginLoading = (payload) => {
  return {
    type: LOGIN_LOADING,
    payload,
  };
};

export const fetchRegisterSuccess = (payload) => {
  return {
    type: REGISTER_SUCCESS,
    payload,
  };
};

export const fetchRegisterLoading = (payload) => {
  return {
    type: REGISTER_LOADING,
    payload,
  };
};

export function login(data) {
  return async (dispatch, getState) => {
    try {
      dispatch(fetchLoginLoading(true));
      const response = await fetch(`${API_URL}/login`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const responseJSON = await response.json();
      if (!response.ok) throw responseJSON.message;
      localStorage.setItem("access_token", responseJSON.access_token);
      return dispatch(fetchLoginSuccess(responseJSON));
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      dispatch(fetchLoginLoading(false));
    }
  };
}

export function fetchMovies(title) {
  return async (dispatch, getState) => {
    try {
      dispatch(fetchMoviesLoading(true));
      const query = title ? `?title=${title}` : "";
      const response = await fetch(`${API_URL}/movies${query}`, {
        headers: {
          "Content-Type": "application/json",
          access_token: localStorage.access_token,
        },
      });

      const responseJSON = await response.json();
      if (!response.ok) throw responseJSON.message;
      return dispatch(fetchMoviesSuccess(responseJSON));
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      dispatch(fetchMoviesLoading(false));
    }
  };
}

export function fetchMovieDetails(movieId) {
  return async (dispatch, getState) => {
    try {
      dispatch(fetchMovieDetailsLoading(true));
      const response = await fetch(`${API_URL}/movies/${movieId}`, {
        headers: {
          "Content-Type": "application/json",
          access_token: localStorage.access_token,
        },
      });

      const responseJSON = await response.json();
      if (!response.ok) throw responseJSON.message;
      return dispatch(fetchMovieDetailsSuccess(responseJSON));
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      dispatch(fetchMovieDetailsLoading(false));
    }
  };
}

export function addMovie(payload) {
  return async (dispatch, getState) => {
    try {
      if (!payload.title) throw new Error("Movie title is required");
      if (!payload.synopsis) throw new Error("Movie synopsis is required");
      if (!payload.imgUrl) throw new Error("Movie imgUrl is required");
      if (!payload.rating) throw new Error("Movie rating is required");
      if (!payload.genreId) throw new Error("Movie genre is required");
      if (
        !(
          Array.isArray(payload.Casts) &&
          payload.Casts.every((cast) => cast?.name) &&
          payload.Casts.length >= 3
        )
      ) {
        throw new Error("Minimum Casts is 3");
      }

      const response = await fetch(`${API_URL}/movies`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          access_token: localStorage.access_token,
        },
        body: JSON.stringify(payload),
      });

      const responseJSON = await response.json();
      if (!response.ok) throw responseJSON.message;
      return await dispatch(fetchMovies());
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
}

export function editMovie(movieId, payload) {
  return async (dispatch, getState) => {
    try {
      console.log(payload);
      if (!payload.title) throw new Error("Movie title is required");
      if (!payload.synopsis) throw new Error("Movie synopsis is required");
      if (!payload.imgUrl) throw new Error("Movie imgUrl is required");
      if (!payload.rating) throw new Error("Movie rating is required");
      if (!payload.genreId) throw new Error("Movie genre is required");
      if (
        !(
          Array.isArray(payload.Casts) &&
          payload.Casts.every((cast) => cast?.name) &&
          payload.Casts.length >= 3
        )
      ) {
        throw new Error("Minimum Casts is 3");
      }

      const response = await fetch(`${API_URL}/movies/${+movieId}`, {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          access_token: localStorage.access_token,
        },
        body: JSON.stringify(payload),
      });

      const responseJSON = await response.json();
      if (!response.ok) throw responseJSON.message;
      return await dispatch(fetchMovies());
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
}

export function deleteMovie(movieId) {
  return async (dispatch, getState) => {
    try {
      const response = await fetch(`${API_URL}/movies/${movieId}`, {
        method: "delete",
        headers: {
          "Content-Type": "application/json",
          access_token: localStorage.access_token,
        },
      });

      const responseJSON = await response.json();
      if (!response.ok) throw responseJSON.message;
      return await dispatch(fetchMovies());
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
}

export function fetchGenres(name) {
  return async (dispatch, getState) => {
    try {
      dispatch(fetchGenresLoading(true));
      const query = name ? `?name=${name}` : "";
      const response = await fetch(`${API_URL}/genres${query}`, {
        headers: {
          "Content-Type": "application/json",
          access_token: localStorage.access_token,
        },
      });

      const responseJSON = await response.json();
      if (!response.ok) throw responseJSON.message;
      return dispatch(fetchGenresSuccess(responseJSON));
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      dispatch(fetchGenresLoading(false));
    }
  };
}

export function fetchGenreDetails(genreId) {
  return async (dispatch, getState) => {
    try {
      dispatch(fetchGenreDetailsLoading(true));
      const response = await fetch(`${API_URL}/genres/${+genreId}`, {
        headers: {
          "Content-Type": "application/json",
          access_token: localStorage.access_token,
        },
      });

      const responseJSON = await response.json();
      if (!response.ok) throw responseJSON.message;
      return dispatch(fetchGenreDetailsSuccess(responseJSON));
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      dispatch(fetchGenreDetailsLoading(false));
    }
  };
}

export function addGenre(payload) {
  return async (dispatch, getState) => {
    try {
      if (!payload.name) {
        throw new Error("Name is required");
      }

      const response = await fetch(`${API_URL}/genres`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          access_token: localStorage.access_token,
        },
        body: JSON.stringify(payload),
      });

      const responseJSON = await response.json();
      if (!response.ok) throw responseJSON.message;
      return await dispatch(fetchGenres());
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
}

export function editGenre(genreId, payload) {
  return async (dispatch, getState) => {
    try {
      if (!payload.name) {
        throw new Error("Name is required");
      }

      const response = await fetch(`${API_URL}/genres/${+genreId}`, {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          access_token: localStorage.access_token,
        },
        body: JSON.stringify(payload),
      });
      const responseJSON = await response.json();
      if (!response.ok) throw responseJSON.message;
      return await dispatch(fetchGenres());
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
}

export function deleteGenre(genreId) {
  return async (dispatch, getState) => {
    try {
      const response = await fetch(`${API_URL}/genres/${+genreId}`, {
        method: "delete",
        headers: {
          "Content-Type": "application/json",
          access_token: localStorage.access_token,
        },
      });
      const responseJSON = await response.json();
      if (!response.ok) throw responseJSON.message;
      return await dispatch(fetchGenres());
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
}

export function addAdmin(payload) {
  return async (dispatch, getState) => {
    try {
      dispatch(fetchRegisterLoading(true));
      if (!payload.email || !payload.password) {
        throw new Error("Email and Password is required");
      }

      const response = await fetch(`${API_URL}/add-admin`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          access_token: localStorage.access_token,
        },
        body: JSON.stringify({ ...payload, role: "admin" }),
      });
      const responseJSON = await response.json();
      if (!response.ok) throw responseJSON.message;
      return dispatch(fetchRegisterSuccess(responseJSON));
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      dispatch(fetchRegisterLoading(false));
    }
  };
}
