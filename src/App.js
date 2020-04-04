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
        phone: localStorage.getItem("user_mobile"),
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

  const changeLanguage = (e) => {
    const language = e.target.id;
    const foodText = document.getElementById("foodText");
    const waterText = document.getElementById("waterText");
    const doctorText = document.getElementById("doctorText");
    const medicineText = document.getElementById("medicineText");
    const psychText = document.getElementById("psychText");
    const ambulanceText = document.getElementById("ambulanceText");
    const emergencyText = document.getElementById("emergencyText");
    const mobileText = document.getElementById("mobileText");
    const placeholderText = document.getElementById("icon_telephone");

    if (language === "englishToggler") {
      foodText.innerText = "Food";
      waterText.innerText = "Water";
      doctorText.innerText = "Doctor";
      medicineText.innerText = "Medicine";
      psychText.innerText = "Just Talk";
      ambulanceText.innerText = "Ambulance";
      emergencyText.innerText = "USE IN CASE OF EMERGENCY ONLY";
      try {
        mobileText.innerText = "Your registered number is";
      } catch (error) {
        console.log(error);
      }
      try {
        placeholderText.placeholder = "Enter your phone number";
      } catch (error) {}
    }
    if (language === "hindiToggler") {
      foodText.innerText = "खाना";
      waterText.innerText = "पानी";
      doctorText.innerText = "डॉक्टर";
      medicineText.innerText = "दवाई";
      psychText.innerText = "बातचीत";
      ambulanceText.innerText = "आंब्युलेन्स";
      emergencyText.innerText = "केवल आपातकालीन स्थितियों के लिए उपयोग करें";
      try {
        mobileText.innerText = "आपके द्वारा दिया गया नंबर है";
      } catch (error) {
        console.log(error);
      }
      try {
        placeholderText.placeholder = "अपना फोन नंबर लिखें";
      } catch (error) {
        console.log(error);
      }
    }
  };

  // eslint-disable-next-line no-unused-vars
  const [locationState, setLocationState] = useState();
  const [received, setReceived] = useState(false);
  return (
    <div className="App">
      <main className="App-header">
        <div className="right-align" style={{ fontSize: 12, marginRight: 10 }}>
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
        <h5 id="emergencyText">केवल आपातकालीन स्थितियों के लिए उपयोग करें </h5>
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
          ) : (
            <p>
              <span id="mobileText">आपके द्वारा दिया गया नंबर है</span>{" "}
              {localStorage.getItem("user_mobile")}
            </p>
          )}
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
                <h4 id="foodText">खाना</h4>
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
                <h4 id="waterText">पानी</h4>
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
                <h4 id="doctorText">डॉक्टर</h4>
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
                <h4 id="medicineText">दवाई</h4>
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
                <h4 id="ambulanceText">आंब्युलेन्स</h4>
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
                <h4 id="psychText">बातचीत</h4>
              </button>
            </div>
          </div>
        </div>
        {/* <FooterComp /> */}
      </main>
    </div>
  );
}

export default App;
