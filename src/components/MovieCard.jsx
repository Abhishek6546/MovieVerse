import React from "react";

const MovieCard = ({ movie, handleSelect }) => {
  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iNDUwIiB2aWV3Qm94PSIwIDAgMzAwIDQ1MCI+CiAgPHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iI2YzZjRmNSIgLz4KICA8dGV4dCB4PSI1MCUiIHk9IjUwJSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBhbGlnbm1lbnQtYmFzZWxpbmU9Im1pZGRsZSIgZmlsbD0jN2c4YjliPk5vIFBvc3RlciBBdmFpbGFibGU8L3RleHQ+Cjwvc3ZnPg==';
  };

  return (
    <div 
      className="bg-gray-900 rounded-xl overflow-hidden shadow-lg cursor-pointer h-full flex flex-col border border-gray-800 hover:border-blue-500/50 hover:shadow-xl hover:shadow-blue-900/10 transition-all duration-200"
      onClick={() => handleSelect(movie)}
    >
      <div className="relative pt-[150%] bg-gradient-to-br from-gray-800 to-gray-900">
        <img
          src={movie.Poster !== "N/A" ? movie.Poster : 'https://cdn.pixabay.com/photo/2019/04/24/21/55/cinema-4153289_1280.jpg'}
          alt={movie.Title}
          className="absolute inset-0 w-full h-full object-cover"
          onError={handleImageError}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
        <span className="absolute top-3 right-3 bg-gray-900/80 backdrop-blur-sm text-xs font-semibold text-white px-2.5 py-1 rounded-full border border-gray-700">
          {movie.Type}
        </span>
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
          <div className="flex items-center space-x-2 text-white/90 text-sm">
            <span className="flex items-center">
              <svg className="w-3.5 h-3.5 mr-1 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              {movie.Year}
            </span>
          </div>
        </div>
      </div>
      
      <div className="p-4 flex-grow flex flex-col">
        <h3 className="text-lg mb-1 font-bold text-white line-clamp-2 leading-tight ">
          {movie.Title}
        </h3>
        <div className="mt-auto pt-2 border-t border-gray-800 flex items-center justify-between">
          <span className="text-sm text-gray-300 font-medium">
            {movie.Year}
          </span>
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-900/50 text-blue-300 border border-blue-800/50">
            {movie.Type}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
