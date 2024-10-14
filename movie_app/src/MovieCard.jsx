import React from 'react';

const MovieCard = ({ movie: { imdbID, Year, Poster, Title, Type } }) => {
  return (
    <div className="movie" key={imdbID}>
      {/* Movie Year */}
      <div className="movie-year">
        <p>{Year}</p>
      </div>

      {/* Movie Poster */}
      <div className="movie-poster">
        <img
          src={Poster !== "N/A" ? Poster : "https://via.placeholder.com/400"}
          alt={Title}
        />
      </div>

      {/* Movie Details */}
      <div className="movie-details">
        <span className="movie-type">{Type}</span>
        <h3 className="movie-title">{Title}</h3>
      </div>
    </div>
  );
};

export default MovieCard;
