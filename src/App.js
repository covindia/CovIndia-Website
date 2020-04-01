import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const getLocation = e => {
    let typeService = e.target.name;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        setLocationState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
        axios
          .post("https://ach4l.pythonanywhere.com/sos", {
            lat: position.coords.latitude,
            long: position.coords.longitude,
            type: typeService
          })
          .then(res => {
            console.log(res);
          })
          .catch(e => {
            console.log(e);
          });
      });
    }
  };

  const [locationState, setLocationState] = useState();
  return (
    <div className="App">
      <header className="App-header">
        {locationState && (
          <p>
            {`Your latitude is ${locationState.latitude}, longitude is ${locationState.longitude}`}
          </p>
        )}
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <button
                className="help-button"
                id="Food"
                name="Food"
                onClick={getLocation}
              >
                Food
              </button>
            </div>
            <div className="col-md-3">
              <button
                className="help-button"
                name="Doctor"
                id="Doctor"
                onClick={getLocation}
              >
                Doctor
              </button>
            </div>
            <div className="col-md-3">
              <button
                className="help-button"
                name="Medicine"
                id="Medicine"
                onClick={getLocation}
              >
                Medicine
              </button>
            </div>
            <div className="col-md-3">
              <button
                className="help-button"
                name="Mental"
                id="Mental"
                onClick={getLocation}
              >
                Mental
              </button>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
