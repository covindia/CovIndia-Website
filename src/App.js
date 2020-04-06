import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { changeLanguage } from "./utils/helpers";
import ServiceButton from "./components/ServiceButton";
import Register from "./components/Registration";
import OrgHome from "./components/OrgHome";
function App() {
  const [services, setServices] = useState([]);
  const postToAchal = (lat, long, type) => {
    axios
      .post("https://ach4l.pythonanywhere.com/sos", {
        lat: lat,
        long: long,
        type: type,
        phone: localStorage.getItem("user_mobile"),
        org: window.location.href.split("/")[3],
      })
      .then((res) => {
        console.log(res);
        setReceived(true);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const getLocation = (e) => {
    if (localStorage.getItem("user_mobile") !== null) {
      let typeService = e.target.name;
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          setLocationState({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
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
    <Router>
      <div className="App">
        <main className="App-header">
          <Switch>
            <Route path="/registration">
              <Register />
            </Route>
            <Route path="/:org">
              <OrgHome />
            </Route>
            <Route path="/">
              <h2>{window.location.href.split("/")[3].toUpperCase()}</h2>
              <div
                className="right-align"
                style={{ fontSize: 12, marginRight: 10 }}
              >
                <span
                  id="hindiToggler"
                  style={{ margin: 5, padding: 5 }}
                  onClick={changeLanguage}
                >
                  हिन्दी
                </span>
                |
                <span
                  id="englishToggler"
                  style={{ margin: 5, padding: 5 }}
                  onClick={changeLanguage}
                >
                  English
                </span>
              </div>
              <h5 id="emergencyText">
                केवल आपातकालीन स्थितियों के लिए उपयोग करें{" "}
              </h5>
              {received === true ? (
                <p>Your request has been received, we will get back shortly</p>
              ) : null}
              <div className="container">
                {localStorage.getItem("user_mobile") === null ? (
                  <div className="row">
                    <div className="col s12">
                      <input
                        placeholder="अपना फोन नंबर लिखें"
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
                          <span id="submitText">बटन दबाएं</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <p>
                    <span id="mobileText">आपके द्वारा दिया गया नंबर है</span>{" "}
                    {localStorage.getItem("user_mobile")}
                  </p>
                )}
                <div className="row">
                  <div className="col s12">
                    <ServiceButton name="food" getLocation={getLocation} />
                    <ServiceButton name="water" getLocation={getLocation} />
                  </div>
                </div>
                <div className="row">
                  <div className="col s12">
                    <ServiceButton name="doctor" getLocation={getLocation} />
                    <ServiceButton name="medicine" getLocation={getLocation} />
                  </div>
                </div>
                <div className="row">
                  <div className="col s12">
                    <ServiceButton name="ambulance" getLocation={getLocation} />
                    <ServiceButton name="talk" getLocation={getLocation} />
                  </div>
                </div>
              </div>
            </Route>
          </Switch>
        </main>
      </div>
    </Router>
  );
}

export default App;
