import React from 'react';
import { FiSearch, FiX } from 'react-icons/fi';

const SearchBar = ({ query, setQuery, handleSearch, isLoading }) => {
  return (
    <form onSubmit={handleSearch} className="w-full max-w-2xl">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <FiSearch className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for movies, TV shows..."
          className="block w-full pl-10 pr-32 py-3 border border-gray-700 rounded-full bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
          disabled={isLoading}
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery('')}
            className="absolute inset-y-0 right-20 flex items-center pr-3 text-gray-400 hover:text-white transition-colors"
            disabled={isLoading}
          >
            <FiX className="h-5 w-5" />
          </button>
        )}
        <button
          type="submit"
          disabled={isLoading || !query.trim()}
          className={`absolute right-1 top-1/2 -translate-y-1/2 px-4 py-2 rounded-full font-medium transition-all duration-200 ${
            isLoading || !query.trim()
              ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
              : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 shadow-lg hover:shadow-purple-500/20'
          }`}
        >
          {isLoading ? 'Searching...' : 'Search'}
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
