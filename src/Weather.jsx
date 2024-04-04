import React from 'react';
import Card from 'react-bootstrap/Card';

function Weather({ weatherData }) {
  return (
    <>
      <h2>Weather Forecast</h2>
      <div className="forecast-list">
        {weatherData.map((forecast, index) => (
          <Card key={index} style={{ width: '18rem' }}>
            <Card.Body>
              <Card.Text>Date: {forecast.date}</Card.Text>
              <Card.Text>Description: {forecast.description}</Card.Text>
              <Card.Text>Min Temp: {forecast.minTemp}</Card.Text>
              <Card.Text>Max Temp: {forecast.maxTemp}</Card.Text>
            </Card.Body>
          </Card> 
        ))}
      </div>
    </>
  );
}

export default Weather