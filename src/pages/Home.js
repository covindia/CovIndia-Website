import React from "react";
import MapGraph from "../components/MapGraph";
import NavBar from "../components/NavBar";

const Home = () => {
  return (
    <div>
      <NavBar />
      <div id="text-data">
        <div
          className="container"
          style={{
            marginTop: "5em",
            textAlign: "center",
            color: "rgb(180, 180, 180)"
          }}
        >
          {/* <h4>The Covid-19 (Coronavirus) pandemic by district in India.</h4> */}
        </div>
        <div id="total-number-infected">
          <div
            className="container"
            style={{ marginTop: "1em", textAlign: "center" }}
          >
            <h6 style={{ fontSize: "1.5em", color: "#ffffff" }}>
              Infected: <span id="infected" style={{ fontSize: "inherit" }} />
              <br />
              <span style={{ fontSize: "0.725em" }}>
                Cured: <span id="cured" style={{ fontSize: "inherit" }} />
                <span style={{ color: "#A9A9A9" }}>|</span> Deaths:
                <span id="deaths" style={{ fontSize: "inherit" }} />
              </span>
            </h6>
            <a
              href="#latest-update"
              style={{ color: "#c297cc", fontSize: "1.2rem" }}
            >
              [Our Sources]
            </a>
          </div>
        </div>
        <div
          className="container"
          style={{
            marginTop: "2em",
            textAlign: "center",
            color: "rgb(170, 170, 170)"
          }}
        >
          <h4 style={{ color: "#ffffff" }}>
            <strong>
              Tap on the map to get more information about each district.
            </strong>
          </h4>
          <small>
            <em>
              As we can see from the map, most of India is relatively unaffected
              <br />
              and there is no need to panic
            </em>
          </small>
          {/* LAST UPDATED TIME */}
        </div>
      </div>
      <br />
      <br />
      <div
        className="container"
        id="legend-colorbar"
        style={{ textAlign: "right" }}
      >
        <svg id="legend" width={200} height={30}>
          <defs>
            <linearGradient id="RYG">
              <stop offset="5%" stopColor="#0f0" />
              <stop offset="50%" stopColor="#ff0" />
              <stop offset="95%" stopColor="#f00" />
            </linearGradient>
          </defs>
          <rect x={50} y={0} width={150} height={20} fill="url(#RYG)" />
          <text id="hi" x={45} y={18} textAnchor="end" fill="white">
            1
          </text>
          <text id="md" x={100} y={27} textAnchor="middle" />
          <text x={125} y={30} fontWeight="bold" textAnchor="start" />
        </svg>
        <p style={{ float: "right" }}>
          <span id="max-infected" style={{ marginLeft: 5 }} />
        </p>
      </div>
      <MapGraph />
      <a
        href="whatsapp://send?text=CovIndia provides the latest district-wise updates on the spead of the coronavirus in India. Stay Safe. Stay Calm. Be Informed.   https://covindia.com/"
        data-action="share/whatsapp/share"
        className="float grow"
      >
        <i className="fab fa-whatsapp my-float" />
      </a>
      <a
        href="https://twitter.com/intent/tweet?text=https://covindia.com/ CovIndia provides the latest district-wise updates on the spead of the coronavirus in India. Stay Safe. Stay Calm. Be Informed #COVID2019india #coronavirusindia."
        data-action="share/whatsapp/share"
        className="float-twitter grow"
      >
        <i className="fab fa-twitter my-float" />
      </a>
      <div className="container">
        <div className="row">
          <div className="col-md-4" />
          <div className="col-md-4">
            <p>The coronavirus in India over the past few days</p>
            <img
              className="img"
              src={"/img/16-23March.gif"}
              alt="GIF"
              style={{
                width: 250,
                marginLeft: "auto",
                marginRight: "auto",
                display: "block"
              }}
            />
            <div className="row">
              {/* <div class="container text-center"><span>Share this gif:</span>
			<small><i class="fab fa-whatsapp" style="text-shadow: none; "></i></small>
			<small><i class="fab fa-twitter" style="text-shadow: none; "></i></small>
			<small><i class="fab fa-instagram fa-2x" style="text-shadow: none; "></i></small></div></div>
			</div> */}
            </div>
          </div>
          <div className="col-md-4" />
        </div>
        <div className="row">
          <div className="col-md-12" />
          <div className="col-md-3" />
          <div
            className="col-md-6"
            style={{ textAlign: "center", justifyContent: "center" }}
          >
            <p style={{ fontSize: "1.5rem" }}>
              <img
                src={"/img/icons/graph.png"}
                alt="graph icon"
                width="25px"
                style={{ paddingBottom: 10 }}
              />
              &nbsp;Click
              <a
                href="analytics"
                style={{ color: "#CC99CC", fontSize: "1.5rem" }}
              >
                here
              </a>
              to see daily trends. <br />
            </p>
            <blockquote className="blockquote">
              <p className="mb-0">
                "... Well done all of you at @StudyatMEC, district wise data is
                going to be phenomenally useful."
              </p>
              <footer className="blockquote-footer">
                <a
                  href="https://twitter.com/anandmahindra/status/1240270762638020608"
                  className="tweet"
                  style={{ color: "#cc99cc" }}
                >
                  Tweeted by <cite title="Source Title">@anandmahindra</cite>
                </a>
              </footer>
            </blockquote>
            {/* <img src="assets/img/tweet.PNG" alt="..." class="img-thumbnail"> */}
            <br />
            <br />
            <a href="https://twitter.com/covindia/status/1240565650495377410">
              <img
                src={"/img/icons/feedbackIcon.png"}
                alt="Feedback"
                width="150px"
              />
            </a>
            <br />
            If you find any error in our data, please click
            <a
              href="https://twitter.com/covindia/status/1240565650495377410"
              style={{ color: "#CC99CC", fontSize: "1em" }}
            >
              here
            </a>
            .
          </div>
          <div className="col-md-3" />
        </div>
      </div>
      <div
        className="container"
        style={{ marginTop: "2em", textAlign: "center" }}
        id="latest-update"
      >
        <h4>Latest Updates</h4>
        <br />
        <span id="latest-updates" />
      </div>
      <div
        className="container"
        style={{ marginTop: "2em", textAlign: "center" }}
      >
        <p>
          Click on "Add to home screen" button to install this page as a live
          app on your smartphone.
        </p>
      </div>
      <br />
      <div
        className="container"
        style={{ marginTop: "2em", textAlign: "center" }}
      >
        <h2>How we do it</h2>
        <br />
        <p>
          We use{" "}
          <strong style={{ color: "#cc99cc" }}>Artificial intelligence</strong>{" "}
          to retrieve the relevant information as
          <strong style={{ color: "#cc99cc" }}>quickly</strong> as possible and
          use
          <strong style={{ color: "#cc99cc" }}>Human Intelligence</strong>{" "}
          (student volunteers) to ensure that all data is
          <strong style={{ color: "#cc99cc" }}>verified</strong> before we claim
          a new case has been reported. To ensure no false reporting, we also
          encourage our users to report any error in our data.
        </p>
        <button
          type="button"
          className="btn btn-light no-dec"
          style={{ backgroundColor: "#cc99cc !important" }}
        >
          <a
            href="https://medium.com/@achalagrawal/how-a-bunch-of-students-worked-from-home-to-create-the-most-detailed-corona-virus-tracker-of-india-c748cd550a2b"
            style={{ color: "#3f3f3f", textDecoration: "none" }}
          >
            <strong>Read more on </strong>
            <span className="badge badge-light">
              <i className="fab fa-medium" style={{ textShadow: "none" }} />
            </span>
          </a>
        </button>
      </div>
      <div id="total-number-list">
        <div
          className="container"
          style={{ marginTop: "4em", textAlign: "center" }}
        >
          {/* LIST COUNT */}
        </div>
      </div>
      <div
        className="container-fluid footer-dark"
        style={{ color: "rgb(170, 170, 170)" }}
      >
        <div className="row ">
          <div className="col-md-4" />
          <div className="col-md-4 text-center">
            <h2
              className="footer-dark-heading"
              style={{ fontFamily: '"Poppins", sans-serif' }}
            >
              <span style={{ color: "#cc99cc", fontSize: "1em" }}>Cov</span>
              India
            </h2>
            <div className="row">
              <div className="col-md-4" />
              <div className="col-md-4 footer-navigation add-footer-margin-below">
                <a href="about">About</a>
                <br />
              </div>
              <div className="col-md-4" />
            </div>
          </div>
          <div className="col-md-4" />
        </div>
        <br />
        <br />
        <div className="row">
          <div className="col-md-2" />
          <div className="col-md-8" style={{ textAlign: "center" }}>
            In case you find any error, please tweet out to:
            <a href="https://twitter.com/covindia" style={{ color: "#CC99CC" }}>
              covindia
            </a>
            .<br />
            <br />
            This is a visualization of the Covid-19 (Coronavirus) pandemic by
            district in India. This website is updated regularly by a group of
            volunteer students. Our sources are The Ministry of Health and
            trustworthy news articles. We do not believe in spreading
            speculations by news outlets.
            <br />
            We are a group of dedicated students trying to keep everyone as
            informed as possible. We pledge to <strong>NEVER SELL</strong> your
            data and keep the site <strong>FREE FOREVER.</strong> If you would
            like to help us out: <br />
            <br />
            <button
              onClick={() =>
                (window.location.href =
                  "https://www.youtube.com/watch?v=dQw4w9WgXcQ")
              }
              type="button"
              className="btn btn-outline-success donate"
            >
              <strong>DONATE </strong>
              <span className="badge badge-light">₹</span>
            </button>
            <br />
            <br />
            Click here for:
            <a href="disclaimer" style={{ color: "#CC99CC" }}>
              Disclaimer
            </a>
            <br />
            <br />
            <a href="https://www.mohfw.gov.in/" style={{ color: "#CC99CC" }}>
              https://www.mohfw.gov.in/
            </a>
            <br />
            The Helpline Number for corona-virus : +91-11-23978046
          </div>
          <div className="col-md-2" />
        </div>
        <div className="row" style={{ marginTop: "3em" }}>
          <a
            href="https://www.netlify.com"
            style={{
              marginLeft: "auto",
              marginRight: "auto",
              display: "block"
            }}
          >
            <img
              src="https://www.netlify.com/img/global/badges/netlify-light.svg"
              alt="Deploys by Netlify"
            />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Home;
