import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { Head } from "@unhead/react";
import { parseAsInteger, useQueryState } from "nuqs";
import { Link } from "react-router";
import { discoverMovies } from "@/api/tmdb";
import { ErrorMessage } from "@/components/shared/error-message";
import { MovieCard, MovieCardSkeleton } from "@/components/shared/movie-card";
import { MoviesPagination } from "@/components/shared/movies-pagination";

export default function Movies() {
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));

  const { data, isLoading, isError, isPlaceholderData, refetch } = useQuery({
    queryKey: ["movies", "page", page],
    queryFn: () => discoverMovies(page),
    placeholderData: keepPreviousData,
  });

  return (
    <>
      <Head>
        <title>Explore Movies | Page: {page}</title>
      </Head>
      <div className="pt-6 pb-22 px-4 md:px-6 relative">
        {data && (
          <div className="fixed bottom-0 left-0 right-0 z-10 w-full p-4 flex items-center justify-center">
            <MoviesPagination
              className="rounded-md bg-secondary/75 p-2 backdrop-blur-xl w-auto shadow-lg"
              currentPage={page}
              totalPages={data.total_pages}
              onPageChange={setPage}
            />
          </div>
        )}

        <div className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight">Explore Popular Movies</h1>
          <p className="text-muted-foreground">Discover the most popular movies right now.</p>
        </div>

        {isError && (
          <ErrorMessage
            className="mt-4"
            title="Something went wrong!"
            message="We are currently unable to load the movies. Please check your internet connection or try
          again later."
            onRetry={refetch}
          />
        )}

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {(isLoading || isPlaceholderData) &&
            [...Array(10).keys()].map((index) => <MovieCardSkeleton key={index} />)}

          {!isLoading &&
            !isPlaceholderData &&
            data &&
            data.results.map((movie) => (
              <Link key={movie.id} to={`/movies/${movie.id}`}>
                <MovieCard movie={movie} />
              </Link>
            ))}
        </div>
      </div>
    </>
  );
}
