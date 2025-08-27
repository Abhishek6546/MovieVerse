import React, { useEffect, useState } from "react";
import ReadMoreText from "./ReadMoreText";

const MovieDetails = ({ movie, onClose }) => {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  const API_KEY = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    let ignore = false;
    async function fetchDetails() {
      try {
        setLoading(true);
        setErr(null);
        const id = movie.imdbID;
        if (!id) {
          setDetails(movie);
          setLoading(false);
          return;
        }
        const res = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&i=${id}&plot=full`);
        const data = await res.json();
        if (!ignore) {
          if (data && data.Response === "True") {
            setDetails(data);
          } else {
            setDetails(movie);
            setErr(data?.Error || "Failed to load details");
          }
        }
      } catch (e) {
        if (!ignore) {
          setErr("Failed to load details");
          setDetails(movie);
        }
      } finally {
        if (!ignore) setLoading(false);
      }
    }
    fetchDetails();
    return () => { ignore = true; };
  }, [movie]);

  const data = details || movie;

  const handleStream = (e) => {
    e.preventDefault();
    const searchQuery = encodeURIComponent(`${data.Title || data.title} ${data.Year || ""} full movie`);
    window.open(`https://www.youtube.com/results?search_query=${searchQuery}`, '_blank');
  };

  const handleDownload = (e) => {
    e.preventDefault();
    const searchQuery = encodeURIComponent(`${data.Title || data.title} ${data.Year || ""} download`);
    window.open(`https://www.google.com/search?q=${searchQuery}`, '_blank');
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50 p-4">
      <div className="bg-gray-900 text-gray-100 rounded-md w-full max-w-4xl relative max-h-[90vh] overflow-y-auto shadow-2xl">
        <button 
          aria-label="Close"
          className="absolute top-2 right-2 text-2xl text-gray-300 hover:text-white bg-transparent hover:bg-white/10 rounded-full w-10 h-10 flex items-center justify-center transition-colors"
          onClick={onClose}
        >
          &times;
        </button>

        {loading ? (
          <div className="flex flex-col items-center justify-center p-16 space-y-6">
            <div className="relative">
              <div className="w-20 h-20 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full animate-pulse"></div>
              </div>
            </div>
            <div className="text-center">
              <p className="text-xl font-medium text-gray-200">Preparing Movie Details</p>
              <p className="text-sm text-gray-400">Fetching all the exciting details for you</p>
            </div>
          </div>
        ) : (
          <div className="md:flex">
            <div className="md:w-1/3 p-4">
              <img
                src={data.Poster !== "N/A" ? data.Poster : 'https://cdn.pixabay.com/photo/2019/04/24/21/55/cinema-4153289_1280.jpg'}
                alt={data.Title || data.title}
                className="w-full h-auto rounded shadow-lg"
              />
            </div>
            <div className="p-6 md:w-2/3">
              <h2 className="text-3xl font-bold mb-2 text-white">{data.Title || data.title}</h2>
              <div className="flex flex-wrap items-center gap-2 mb-4">
                {data.Year && (
                  <span className="bg-blue-500/20 text-blue-300 text-xs font-medium px-2.5 py-0.5 rounded">
                    {data.Year}
                  </span>
                )}
                {data.Rated && <span className="text-gray-300">• {data.Rated}</span>}
                {data.Runtime && <span className="text-gray-300">• {data.Runtime}</span>}
              </div>

              <div className="mb-4">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  {data.imdbRating && (
                    <span className="inline-flex items-center bg-yellow-500 text-black text-xs font-semibold px-2 py-1 rounded">
                      ★ {data.imdbRating}/10
                    </span>
                  )}
                  {data.Genre && <span className="text-gray-300">{data.Genre}</span>}
                </div>
                <ReadMoreText text={data.Plot || 'No plot available.'} maxLength={200} />
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <h4 className="font-semibold">Director</h4>
                  <p className="text-gray-300">{data.Director || 'N/A'}</p>
                </div>
                <div>
                  <h4 className="font-semibold">Cast</h4>
                  <p className="text-gray-300">{data.Actors || 'N/A'}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 mt-6">
                <button
                  onClick={handleStream}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition duration-200 flex items-center justify-center"
                >
                  Stream Now
                </button>
                <button
                  onClick={handleDownload}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition duration-200 flex items-center justify-center"
                >
                  Download
                </button>
              </div>

              {err && (
                <p className="mt-4 text-sm text-red-400">{err}</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieDetails;
