import React from 'react';
import Card from 'react-bootstrap/Card';


function Movies({ movieData }) {
    return (
        <>
            <h2>Movies</h2>
            <div className="movies-list">
                {movieData.map((movie, index) => (
                    <Card key={index} style={{ width: '18rem' }}>
                        <Card.Body>
                            <Card.Text>Title {movie.title}</Card.Text>
                            <Card.Text>Release Date: {movie.releaseDate}</Card.Text>
                            <Card.Text>Overview: {movie.overview}</Card.Text>
                        </Card.Body>
                    </Card>
                ))}
            </div>
        </>
    )
}
export default Movies