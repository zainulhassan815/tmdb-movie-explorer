import { axiosClient } from "@/config/axios-client";

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

export const discoverMovies = async (page = 1) => {
  const response = await axiosClient.get(
    "/discover/movie?include_video=false&language=en-US&sort_by=popularity.desc",
    {
      params: {
        page,
      },
    },
  );

  return formatResponseData(response.data);
};

export const searchMovies = async (query, page = 1, { signal }) => {
  const response = await axiosClient.get("/search/movie?include_video=false&language=en-US", {
    params: {
      query,
      page,
    },
    signal: signal ?? undefined,
  });

  return formatResponseData(response.data);
};

export const getRecommendationsByMovieId = async (movieId) => {
  const response = await axiosClient.get(
    `/movie/${movieId}/recommendations?include_video=false&language=en-US`,
  );

  return formatResponseData(response.data).results;
};

export const getReviewsByMovieId = async (movieId) => {
  const response = await axiosClient.get(`/movie/${movieId}/reviews?language=en-US`);
  return response.data.results;
};

export const getMovieById = async (id) => {
  const response = await axiosClient.get(`/movie/${id}`);
  return {
    ...response.data,
    genres: response.data.genres.map((genre) => genre.name),
  };
};
