import { Route, Routes } from "react-router";
import AuthCallback from "@/app/pages/auth-callback";
import MovieDetails from "@/app/pages/movie-details";
import Movies from "@/app/pages/movies";
import NotFound from "@/app/pages/not-found";
import Search from "@/app/pages/search";
import { Layout } from "@/components/layout/layout";
import { useAuth } from "@/hooks/use-auth";

export default function App() {
  // Load user data on startup
  useAuth();

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Movies />} />
        <Route path="/search" element={<Search />} />
        <Route path="/movies/:id" element={<MovieDetails />} />
        <Route path="/callback" element={<AuthCallback />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
