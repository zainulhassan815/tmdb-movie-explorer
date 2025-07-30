import { axiosClient } from "@/config/axios-client";

export async function apiRequest(url, config = {}) {
  const response = await axiosClient.request({
    url,
    method: "GET",
    ...config,
  });

  return response.data;
}

export const genres = [
  {
    id: 28,
    name: "Action",
  },
  {
    id: 12,
    name: "Adventure",
  },
  {
    id: 16,
    name: "Animation",
  },
  {
    id: 35,
    name: "Comedy",
  },
  {
    id: 80,
    name: "Crime",
  },
  {
    id: 99,
    name: "Documentary",
  },
  {
    id: 18,
    name: "Drama",
  },
  {
    id: 10751,
    name: "Family",
  },
  {
    id: 14,
    name: "Fantasy",
  },
  {
    id: 36,
    name: "History",
  },
  {
    id: 27,
    name: "Horror",
  },
  {
    id: 10402,
    name: "Music",
  },
  {
    id: 9648,
    name: "Mystery",
  },
  {
    id: 10749,
    name: "Romance",
  },
  {
    id: 878,
    name: "Science Fiction",
  },
  {
    id: 10770,
    name: "TV Movie",
  },
  {
    id: 53,
    name: "Thriller",
  },
  {
    id: 10752,
    name: "War",
  },
  {
    id: 37,
    name: "Western",
  },
];

const mapGenreIdsToGenres = (genreIds) => {
  return genreIds.map((id) => genres.find((genre) => genre.id === id)?.name).filter(Boolean);
};

const formatResponseData = (data) => {
  return {
    ...data,
    results: data.results.map((movie) => ({
      ...movie,
      genres: mapGenreIdsToGenres(movie.genre_ids),
    })),
  };
};

export const discoverMovies = async (page = 1, options = {}) => {
  const data = await apiRequest("/discover/movie", {
    params: {
      include_video: false,
      language: "en-US",
      sort_by: "popularity.desc",
      page,
    },
    ...options,
  });

  return formatResponseData(data);
};

export const searchMovies = async (query, page = 1, options = {}) => {
  const data = await apiRequest("/search/movie", {
    params: {
      include_video: false,
      language: "en-US",
      query,
      page,
    },
    ...options,
  });

  return formatResponseData(data);
};

export const getRecommendationsByMovieId = async (movieId, options = {}) => {
  const data = await apiRequest(`/movie/${movieId}/recommendations`, {
    params: {
      include_video: false,
      language: "en-US",
    },
    ...options,
  });

  return formatResponseData(data).results;
};

export const getReviewsByMovieId = async (movieId, options = {}) => {
  const data = await apiRequest(`/movie/${movieId}/reviews`, {
    params: {
      language: "en-US",
    },
    ...options,
  });

  return data.results;
};

export const getMovieById = async (id, options = {}) => {
  const data = await apiRequest(`/movie/${id}`, {
    ...options,
  });

  return {
    ...data,
    genres: data.genres.map((genre) => genre.name),
  };
};

export const generateRequestToken = async (options = {}) => {
  const data = await apiRequest("/authentication/token/new", {
    ...options,
  });

  return data.request_token;
};

export const generateSessionId = async (requestToken, options = {}) => {
  const data = await apiRequest("/authentication/session/new", {
    method: "POST",
    data: {
      request_token: requestToken,
    },
    ...options,
  });

  return data.session_id;
};

export const getAccountDetails = async (sessionId, options = {}) => {
  const data = await apiRequest("/account", {
    params: {
      session_id: sessionId,
    },
    ...options,
  });

  return data;
};
