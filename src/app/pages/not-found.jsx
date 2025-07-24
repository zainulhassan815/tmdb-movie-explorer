import { Home, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";

const movieQuotes = [
  "I'll be back... to the homepage.",
  "Houston, we have a problem... this page doesn't exist.",
  "May the Force be with you... in finding the right page.",
  "Nobody puts this page in a corner... because it's not here.",
  "Here's looking at you, kid... but not at this page.",
  "Show me the money... or at least show me a working page.",
  "I see dead links.",
  "Frankly, my dear, I don't give a damn... about this missing page.",
];

export default function NotFound() {
  const [currentQuote, setCurrentQuote] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % movieQuotes.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="container mx-auto max-w-4xl text-center">
        <div className="text-9xl font-bold select-none">404</div>
        <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4">Page Not Found</h1>

        {/* Movie Quote */}
        <div className="mb-8 h-16 flex items-center justify-center">
          <p className="text-lg md:text-xl text-muted-foreground italic transition-opacity duration-500 max-w-2xl">
            "{movieQuotes[currentQuote]}"
          </p>
        </div>

        <p className="text-foreground/90 text-lg mb-8 max-w-2xl mx-auto">
          Looks like this page went to the movies and never came back. Don't worry, we've got plenty
          of other great content for you to explore!
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button asChild size="lg">
            <Link to="/">
              <Home className="w-5 h-5 mr-2" />
              Back to Home
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link to="/search">
              <Search className="w-5 h-5 mr-2" />
              Search Movies
            </Link>
          </Button>
        </div>

        {/* Footer Message */}
        <p className="text-sm text-forground/50">
          Lost? Don't worry, even the best directors have a few scenes that end up on the cutting
          room floor.
        </p>
      </div>
    </div>
  );
}
