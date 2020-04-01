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
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-6">
              <button
                className="help-button"
                id="Food"
                name="Food"
                onClick={getLocation}
              >
                <img
                  alt="food"
                  className="img img-icon"
                  src={`${process.env.PUBLIC_URL}/food.png`}
                />
                <h4>Food</h4>
              </button>
            </div>
            <div className="col-md-6">
              <button
                className="help-button"
                name="Doctor"
                id="Doctor"
                onClick={getLocation}
              >
                <img
                  alt="food"
                  className="img img-icon"
                  src={`${process.env.PUBLIC_URL}/doctor.png`}
                />
                <h4>Doctor</h4>
              </button>
            </div>
            <div className="col-md-6">
              <button
                className="help-button"
                name="Medicine"
                id="Medicine"
                onClick={getLocation}
              >
                <img
                  alt="food"
                  className="img img-icon"
                  src={`${process.env.PUBLIC_URL}/medicine.png`}
                />
                <h4>Medicine</h4>
              </button>
            </div>
            <div className="col-md-6">
              <button
                className="help-button"
                name="Mental"
                id="Mental"
                onClick={getLocation}
              >
                <img
                  alt="food"
                  className="img img-icon"
                  src={`${process.env.PUBLIC_URL}/psychology.png`}
                />
                <h4>Mental</h4>
              </button>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
