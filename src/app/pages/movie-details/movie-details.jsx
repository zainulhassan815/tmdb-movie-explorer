import { useQueries } from "@tanstack/react-query";
import { Star } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router";
import { getMovieById, getRecommendationsByMovieId, getReviewsByMovieId } from "@/api/tmdb";
import { ErrorMessage } from "@/components/shared/error-message";
import { MovieCard } from "@/components/shared/movie-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  MovieDetailsHeroSection,
  MovieDetailsHeroSectionLoadingSkeleton,
} from "./movie-details-section";

const combineQueryResults = (results) => ({
  movie: results[0].data,
  reviews: results[1].data,
  recommendations: results[2].data,
  isLoading: results[0].isLoading,
  error: results[0].error,
});

export default function MovieDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  const { movie, reviews, recommendations, isLoading, error } = useQueries({
    queries: [
      {
        queryKey: ["movie", id],
        queryFn: () => getMovieById(id),
        enabled: !!id,
      },
      {
        queryKey: ["movie", id, "reviews"],
        queryFn: () => getReviewsByMovieId(id),
        enabled: !!id,
      },
      {
        queryKey: ["movie", id, "recommendations"],
        queryFn: () => getRecommendationsByMovieId(id),
        enabled: !!id,
      },
    ],
    combine: combineQueryResults,
  });

  if (error) {
    const is404 = error?.response?.status === 404;
    const title = is404 ? "Movie not found" : "Something went wrong";
    const message = is404
      ? "The movie you are looking for does not exist."
      : "We are currently unable to load the movie details. Please check your internet connection or try again later.";
    return (
      <ErrorMessage
        className="mt-4"
        title={title}
        message={message}
        retryButtonTitle="Go Home"
        onRetry={() => (is404 ? navigate("/") : refetch())}
      />
    );
  }

  if (isLoading) {
    return <MovieDetailsHeroSectionLoadingSkeleton />;
  }

  if (movie) {
    return (
      <>
        {/* Hero Section */}
        <MovieDetailsHeroSection movie={movie} onPlayClick={null} onAddToWatchlistClick={null} />

        {/* Recommended Movies */}
        <section className="container w-full mx-auto px-4 py-12">
          <Tabs defaultValue="reviews">
            <TabsList>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
              <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
            </TabsList>
            <TabsContent value="reviews">
              <h1 className="text-3xl font-bold tracking-tight mb-4">Reviews</h1>
              <div className="flex flex-col gap-4">
                {reviews?.map((review) => (
                  <Card key={review.id} className="bg-white/10 backdrop-blur-sm border-white/20">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4 mb-4">
                        <Avatar>
                          <AvatarImage src={``} alt={review.author} />
                          <AvatarFallback>{review.author}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-white">{review.author}</h3>
                            {review.author_details.rating && (
                              <div className="flex items-center gap-1">
                                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                <span className="text-white text-sm">
                                  {review.author_details.rating}/10
                                </span>
                              </div>
                            )}
                          </div>
                          <p className="text-white/70 text-sm">
                            {new Date(review.created_at).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <p className="text-white leading-relaxed line-clamp-5">{review.content}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="recommendations">
              <h1 className="text-3xl font-bold tracking-tight mb-4">Recommended Movies</h1>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                {recommendations?.map((movie) => (
                  <Link key={movie.id} to={`/movies/${movie.id}`}>
                    <MovieCard movie={movie} />
                  </Link>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </section>
      </>
    );
  }
}
