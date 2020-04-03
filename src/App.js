import React, { useState } from "react";
import axios from "axios";
import FooterComp from "./components/FooterComp";
import "./App.css";

function App() {
  const postToAchal = (lat, long, type) => {
    axios
      .post("https://ach4l.pythonanywhere.com/sos", {
        lat: lat,
        long: long,
        type: type,
        phone: localStorage.getItem("user_mobile")
      })
      .then(res => {
        console.log(res);
        setReceived(true);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const getLocation = e => {
    if (localStorage.getItem("user_mobile") !== null) {
      let typeService = e.target.name;
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          setLocationState({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
          postToAchal(
            position.coords.latitude,
            position.coords.longitude,
            typeService
          );
        });
      }
    } else {
      alert("Please add mobile number before proceeding!");
    }
  };

  const saveNumber = () => {
    var MobNum = document.getElementById("icon_telephone");
    if (window.confirm(`Are you sure you your number is ${MobNum.value} ?`)) {
      localStorage.setItem("user_mobile", MobNum.value);
      console.log(MobNum.value);
    } else {
      console.log("Exit Gilla");
    }
  };

  // eslint-disable-next-line no-unused-vars
  const [locationState, setLocationState] = useState();
  const [received, setReceived] = useState(false);
  return (
    <div className="App">
      <main className="App-header">
        <a href="sms:+918790089990?body=this is the text message to send">
          {" "}
          Test{" "}
        </a>
        {received === true ? (
          <p>Your request has been received, we will get back shortly</p>
        ) : null}
        <div className="container">
          {localStorage.getItem("user_mobile") === null ? (
            <div className="row">
              <div className="col s12">
                <input
                  placeholder="Enter your phone number"
                  id="icon_telephone"
                  type="tel"
                  className="validate"
                />
                {/* <label htmlFor="icon_telephone">Phone</label> */}
                <div className="col s12">
                  <button
                    className="waves-effect waves-light btn"
                    onClick={saveNumber}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          ) : null}
          <div className="row">
            <div className="col s12">
              <button
                className="help-button"
                id="Food"
                name="Food"
                onClick={getLocation}
              >
                <img
                  alt="food"
                  className="img img-icon materialboxed"
                  id="Food"
                  name="Food"
                  src={`${process.env.PUBLIC_URL}/food.png`}
                />
                <h4>Food</h4>
              </button>
              <button
                className="help-button"
                name="Water"
                id="Water"
                onClick={getLocation}
              >
                <img
                  alt="food"
                  className="img img-icon materialboxed"
                  name="Water"
                  id="Water"
                  src={`${process.env.PUBLIC_URL}/water.png`}
                />
                <h4>Water</h4>
              </button>
            </div>
          </div>
          <div className="row">
            <div className="col s12">
              <button
                className="help-button"
                name="Doctor"
                id="Doctor"
                onClick={getLocation}
              >
                <img
                  alt="food"
                  className="img img-icon materialboxed"
                  name="Doctor"
                  id="Doctor"
                  src={`${process.env.PUBLIC_URL}/doctor.png`}
                />
                <h4>Doctor</h4>
              </button>

              <button
                className="help-button"
                name="Medicine"
                id="Medicine"
                onClick={getLocation}
              >
                <img
                  alt="food"
                  className="img img-icon materialboxed"
                  name="Medicine"
                  id="Medicine"
                  src={`${process.env.PUBLIC_URL}/medicine.png`}
                />
                <h4>Medicine</h4>
              </button>
            </div>
          </div>
          <div className="row">
            <div className="col s12">
              <button
                className="help-button"
                name="ambulance"
                id="ambulance"
                onClick={getLocation}
              >
                <img
                  alt="food"
                  className="img img-icon materialboxed"
                  name="ambulance"
                  id="ambulance"
                  src={`${process.env.PUBLIC_URL}/ambulance.png`}
                />
                <h4>Ambulance</h4>
              </button>
              <button
                className="help-button"
                name="Mental"
                id="Mental"
                onClick={getLocation}
              >
                <img
                  alt="food"
                  className="img img-icon materialboxed"
                  name="Mental"
                  id="Mental"
                  src={`${process.env.PUBLIC_URL}/psychology.png`}
                />
                <h4>Just Talk</h4>
              </button>
            </div>
          </div>
        </div>
        <FooterComp />
      </main>
    </div>
  );
}

export default App;
