import { Calendar, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const MovieCard = ({ movie }) => {
  return (
    <Card className="max-h-[280px] p-0 group cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
      <div className="flex h-full">
        <div className="relative overflow-hidden rounded-l-lg flex-shrink-0">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="w-[150px] lg:w-[200px] h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1">
            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
            <span className="text-white text-xs font-medium">{movie.vote_average.toFixed(1)}</span>
          </div>
        </div>
        <CardContent className="p-4 lg:p-6 flex-1 flex flex-col justify-between">
          <div>
            <h3 className="font-semibold text-xl mb-3 line-clamp-2">{movie.title}</h3>
            <div className="flex items-center gap-2 mb-3 text-sm text-muted-foreground">
              <Calendar className="w-4 h-4" />
              <span>{new Date(movie.release_date).getFullYear()}</span>
            </div>
            <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
              {movie.overview}
            </p>
          </div>
          <div className="flex flex-wrap gap-1 mb-4">
            {movie.genres.slice(0, 3).map((genre) => (
              <Badge key={genre} variant="secondary" className="text-xs">
                {genre}
              </Badge>
            ))}
          </div>
        </CardContent>
      </div>
    </Card>
  );
};

export const MovieCardSkeleton = () => {
  return (
    <div className="flex flex-row overflow-hidden rounded-lg shadow-lg h-[220px]">
      <Skeleton className="h-full w-[200px]" />
      <div className="flex flex-col p-4 w-full justify-between items-start">
        <div className="flex gap-2 flex-col w-full">
          <Skeleton className="w-full h-6" />
          <Skeleton className="w-12 h-4" />
          <Skeleton className="w-full h-4" />
          <Skeleton className="w-full h-4" />
          <Skeleton className="w-full h-4" />
          <Skeleton className="w-full h-4" />
        </div>
        <div className="flex gap-2 w-full">
          <Skeleton className="w-12 h-4" />
          <Skeleton className="w-12 h-4" />
          <Skeleton className="w-12 h-4" />
        </div>
      </div>
    </div>
  );
};
