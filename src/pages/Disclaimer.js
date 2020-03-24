import React from "react";
import NavBar from "../components/NavBar";

const Disclaimer = () => {
  return (
    <div>
      <NavBar />
      <div
        className="container"
        style={{ marginTop: "5em", textAlign: "justify" }}
      >
        <h1 style={{ borderBottom: "solid" }}>Covinda.com Disclaimer</h1>
        INFORMATION DISPLAYED ON THIS WEBSITE IS COMPILED BY A GROUP OF
        VOLUNTEERS. WHILE WE TAKE GREAT EFFORTS TO ENSURE THE VALIDITY OF THE
        DATA, CERTAIN ERRORS MAY OCCUR. THIS INFORMATION IS PROVIDED "AS IS",
        WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT
        LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
        PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS, COPYRIGHT
        HOLDERS OR VOLUNTEERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
        LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
        FROM, OUT OF OR IN CONNECTION WITH THE INFORMATION OR THE USE OR OTHER
        DEALINGS IN THE WEBSITE.
        <br />
        <br />
        Covindia.com takes no responsibility for the website’s availability,
        accessibility, uptime or any reliance on the website. Covindia.com is
        not directly or indirectly owned or managed by, and is not associated
        with, any organizations under the guise of the Government of India, or
        any other government or official body. Information on the website may be
        inaccurate and these inaccuracies, along with any other aspect of the
        website, may be updated without notice. Relying on the information
        provided is therefore strictly at your own risk. While we try to
        restrict links to sources volunteers deemed reliable, we do not accept
        any liability for, nor do we directly endorse any of the websites that
        are linked to on the website.
      </div>
      <div
        className="container-fluid footer-dark"
        style={{ color: "rgb(170, 170, 170)" }}
      >
        <div className="row ">
          <div className="col-md-4" />
          <div className="col-md-4">
            <h2
              className="footer-dark-heading"
              style={{ fontFamily: '"Poppins", sans-serif' }}
            >
              Covindia
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
            This is a visualization of the Covid-19 (Coronavirus) pandemic by
            district in India. This website is updated regularly by a group of
            volunteer students. Our sources are The Ministry of Health and
            trustworthy news articles. We do not believe in spreading
            speculations by news outlets.
            <br />
            <br />
            Click here for: <a href="disclaimer">Disclaimer</a>
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

export default Disclaimer;
