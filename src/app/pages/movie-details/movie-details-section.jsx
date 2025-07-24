import { Calendar, Clock, Play, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export const MovieDetailsHeroSection = ({
  movie,
  onPlayClick,
  onAddToWatchlistClick,
  className,
  ...props
}) => {
  return (
    <section
      className={cn("relative h-[90svh] md:h-[70svh] w-full overflow-hidden", className)}
      {...props}
    >
      <img
        src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
        className="w-full h-full object-cover"
        alt={movie.title}
      />

      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/75 to-transparent" />

      <div className="absolute bottom-0 left-0 right-0 p-8">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-start">
            <img
              src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
              alt={movie.title}
              className="w-[200px] h-[300px] lg:w-[300px] lg:h-[450px] rounded-lg shadow-2xl bg-secondary"
            />
            <div className="flex-1 text-on-background">
              <h1 className="text-3xl md:text-6xl font-bold mb-4">{movie.title}</h1>
              <div className="flex flex-wrap items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span className="text-lg font-semibold">{movie.vote_average.toFixed(1)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-5 h-5" />
                  <span>{new Date(movie.release_date).getFullYear()}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-5 h-5" />
                  <span>{movie.runtime} min</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                {movie.genres.map((genre) => (
                  <Badge key={genre} variant="secondary" className="bg-white/20 text-white">
                    {genre}
                  </Badge>
                ))}
              </div>
              <p className="text-md md:text-lg line-clamp-5 leading-relaxed mb-6 max-w-3xl">
                {movie.overview}
              </p>
              <div className="flex flex-wrap gap-4">
                <Button onClick={onPlayClick} size="lg" className="w-full md:w-auto">
                  <Play className="w-5 h-5 mr-2" />
                  Watch Trailer
                </Button>
                <Button
                  onClick={onAddToWatchlistClick}
                  size="lg"
                  className="w-full md:w-auto"
                  variant="outline"
                >
                  Add to Watchlist
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const MovieDetailsHeroSectionLoadingSkeleton = ({ className, ...props }) => {
  return (
    <section
      className={cn("relative h-[90svh] md:h-[70svh] w-full overflow-hidden", className)}
      {...props}
    >
      <div className="absolute bottom-0 left-0 right-0 p-8">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-start">
            <Skeleton className="w-[200px] h-[300px] lg:w-[300px] lg:h-[450px] rounded-lg shadow-2xl bg-secondary" />
            <div className="flex-1 text-on-background">
              <Skeleton className="h-8 w-[280px] mb-4" />
              <div className="flex flex-wrap items-center gap-4 mb-4">
                <Skeleton className="h-6 w-16" />
                <Skeleton className="h-6 w-16" />
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                {[...Array(3).keys()].map((index) => (
                  <Skeleton key={index} className="h-4 w-16" />
                ))}
              </div>
              <div className="text-md md:text-lg line-clamp-5 leading-relaxed mb-6 max-w-3xl">
                {[...Array(5).keys()].map((index) => (
                  <Skeleton key={index} className="h-6 w-[380px] mb-2" />
                ))}
              </div>
              <div className="flex flex-wrap gap-4">
                <Skeleton className="h-12 w-28 rounded-full" />
                <Skeleton className="h-12 w-28 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
