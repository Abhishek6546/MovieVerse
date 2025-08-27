import React, { useState, useEffect } from "react";
import axios from "axios";
import { FiSearch, FiLoader, FiAlertCircle, FiFilm } from "react-icons/fi";
import SearchBar from "./components/SearchBar";
import MovieCard from "./components/MovieCard";
import MovieDetails from "./components/MovieDetails";

const App = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [trendingMovies, setTrendingMovies] = useState([]);

  const API_KEY = import.meta.env.VITE_API_KEY;

  const fetchTrending = async () => {
    try {
      const res = await axios.get(
        `https://www.omdbapi.com/?apikey=${API_KEY}&s=movie&type=movie&y=2023`
      );
      if (res.data.Search) {
        setTrendingMovies(res.data.Search.slice(0, 8));
      }
    } catch (err) {
      console.error("Error fetching trending:", err);
    }
  };

  useEffect(() => {
    fetchTrending();
  }, []);

  const handleSearch = async (e) => {
    if (e) e.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      const res = await axios.get(
        `https://www.omdbapi.com/?apikey=${API_KEY}&s=${encodeURIComponent(query)}`
      );

      if (res.data.Response === "True") {
        setMovies(res.data.Search);
      } else {
        setMovies([]);
        setError(res.data.Error || "No results found");
      }
    } catch (err) {
      console.error("Search error:", err);
      setError("Failed to fetch movies. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100">
      {/* Header */}
      <header className="bg-black bg-opacity-80 backdrop-blur-sm sticky top-0 z-10 shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h1 className="text-3xl md:text-4xl font-bold text-white drop-shadow">MovieVerse</h1>
            <SearchBar
              query={query}
              setQuery={setQuery}
              handleSearch={handleSearch}
              isLoading={isLoading}
            />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 min-h-[60vh]">
        {/* Search Results */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-16 space-y-6">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full animate-pulse"></div>
              </div>
            </div>
            <div className="text-center space-y-2">
              <p className="text-lg font-medium text-gray-200 animate-pulse">Finding your movies</p>
              <p className="text-sm text-gray-400">This will just take a moment</p>
              <div className="w-48 h-1 bg-gray-800 rounded-full overflow-hidden mt-2">
                <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 animate-[pulse_2s_ease-in-out_infinite]" style={{ width: '100%' }}></div>
              </div>
            </div>
          </div>
        ) : error ? (
          <div className="bg-red-900/50 border border-red-700 rounded-lg p-6 text-center max-w-2xl mx-auto">
            <FiAlertCircle className="text-5xl text-red-400 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold mb-2">Oops! Something went wrong</h2>
            <p className="text-gray-300">{error}</p>
            <button
              onClick={() => setError(null)}
              className="mt-4 px-6 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors"
            >
              Try Again
            </button>
          </div>
        ) : query && movies.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 space-y-6 text-center">
            <div className="text-6xl mb-4">🎬</div>
            <h2 className="text-2xl font-bold text-gray-200">No movies found</h2>
            <p className="text-gray-400 max-w-md">We couldn't find any movies matching your search. Try different keywords.</p>
          </div>
        ) : movies.length > 0 ? (
          <section>
            <h2 className="text-2xl font-bold mb-6 flex items-center text-white">
              <FiFilm className="mr-2" /> Search Results
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {movies.map((movie) => (
                <MovieCard
                  key={movie.imdbID}
                  movie={movie}
                  handleSelect={setSelectedMovie}
                />
              ))}
            </div>
          </section>
        ) : (
          <section>
            <h2 className="text-2xl font-bold mb-6 text-white">Trending Now</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {trendingMovies.map((movie) => (
                <MovieCard
                  key={movie.imdbID}
                  movie={movie}
                  handleSelect={setSelectedMovie}
                />
              ))}
            </div>
          </section>
        )}
      </main>

      {/* Movie Details Modal */}
      {selectedMovie && (
        <MovieDetails
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}

      {/* Footer */}
      <footer className="bg-black bg-opacity-80 py-8 mt-12">
        <div className="container mx-auto px-4 text-center text-gray-400">
          <p>© {new Date().getFullYear()} MovieVerse. All rights reserved.</p>
          <p className="text-sm mt-2">Data provided by OMDb API</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
