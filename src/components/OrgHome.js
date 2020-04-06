import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ServiceButton from "./ServiceButton";
const OrgHome = (props) => {
  let { org } = useParams();
  const [services, setServices] = useState([]);
  useEffect(() => {
    axios
      .post("https://ach4l.pythonanywhere.com/get_services", {
        org: org,
      })
      .then((res) => {
        setServices(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [org]);
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
    <div>
      {console.log(services)}
      <h3>{org.charAt(0).toUpperCase() + org.slice(1)}</h3>
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
                  <span id="submitText">Submit</span>
                </button>
              </div>
            </div>
          </div>
        ) : (
          <p>
            <span id="mobileText">Your registered number is</span>{" "}
            {localStorage.getItem("user_mobile")}
          </p>
        )}
        <div className="row">
          {services.length !== 0 ? (
            <>
              {console.log(services)}
              <div className="col s6">
                {services["food"] === "True" && (
                  <ServiceButton name="food" getLocation={getLocation} />
                )}
              </div>
              <div className="col s6">
                {services["water"] === "True" && (
                  <ServiceButton name="water" getLocation={getLocation} />
                )}
              </div>
              <div className="col s6">
                {services["doctor"] === "True" && (
                  <ServiceButton name="doctor" getLocation={getLocation} />
                )}
              </div>
              <div className="col s6">
                {services["medicine"] === "True" && (
                  <ServiceButton name="medicine" getLocation={getLocation} />
                )}
              </div>
              <div className="col s6">
                {services["ambulance"] === "True" && (
                  <ServiceButton name="ambulance" getLocation={getLocation} />
                )}
              </div>
              <div className="col s6">
                {services["talk"] === "True" && (
                  <ServiceButton name="talk" getLocation={getLocation} />
                )}
              </div>
            </>
          ) : (
            <h3>Looks like your Organisation isn't registered with us</h3>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrgHome;
