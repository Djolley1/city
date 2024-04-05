import React from 'react';
import Card from 'react-bootstrap/Card';

// Nested Movie component to render individual movie
function Movie({ movie }) {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Text>Title: {movie.title}</Card.Text>
        <Card.Text>Release Date: {movie.releaseDate}</Card.Text>
        <Card.Text>Overview: {movie.overview}</Card.Text>
      </Card.Body>
    </Card>
  );
}

// Movies component rendering multiple Movie components
function Movies({ movieData }) {
  return (
    <>
      <h2>Movies</h2>
      <div className="movies-list">
        {movieData.map((movie, index) => (
          <Movie key={index} movie={movie} />
        ))}
      </div>
    </>
  );
}

export default Movies;