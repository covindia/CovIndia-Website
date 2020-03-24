import React from "react";
import NavBar from "../components/NavBar";

const About = () => {
  return (
    <div>
      <NavBar />
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
      <div
        className="container"
        style={{ marginTop: "5em", textAlign: "justify" }}
        id="body-about"
      >
        <h1 style={{ borderBottom: "solid" }}>About Us</h1>
        <p>
          Covindia is a website started by{" "}
          <a href="https://icecereal.github.io" style={{ fontSize: "1em" }}>
            Raghav NS
          </a>
          , <a href="https://github.com/AnantaSrikar">Ananta Srikar</a>,{" "}
          <a href="https://www.linkedin.com/in/rishab-ramanathan-625609153/">
            Rishab Ramanathan
          </a>{" "}
          under the guidance of
          <a
            href="https://www.linkedin.com/in/achal-agrawal-42331855/"
            style={{ fontSize: "1em" }}
          >
            Dr. Achal Agrawal
          </a>
          ,{" "}
          <a
            href="https://www.mahindraecolecentrale.edu.in/faculty/bharghava-rajaram"
            style={{ fontSize: "1em" }}
          >
            Dr. Bharghava Rajaram
          </a>
          ,{" "}
          <a
            href="https://www.linkedin.com/in/01rajnarayanan/"
            style={{ fontSize: "1em" }}
          >
            Mr. Raj Narayanan
          </a>{" "}
          of{" "}
          <a
            href="https://www.mahindraecolecentrale.edu.in/"
            style={{ fontSize: "1em" }}
          >
            Mahindra École Centrale, Hyderabad
          </a>
          . We are a dedicated team of students and professors from Mahindra
          Ecole Centrale who are committed to keeping everyone as informed as we
          possibly can. We do not make any profit from this and hence are
          totally commited to not spreading false news. This is why{" "}
          <span style={{ color: "#dba6db" }}>
            <strong>ALL OUR UPDATES</strong>
          </span>{" "}
          are backed by news articles from trustworthy sources like :
          <br />
        </p>
        <ul>
          <li>
            <a href="https://www.mohfw.gov.in/">
              {" "}
              Ministry of Health and Family Welfare
            </a>
          </li>
          {/* <li><a href="https://www.pharmaceutical-technology.com/news/india-covid-19-coronavirus-updates-status-by-state/">Pharmaceutical Technology</a></li> */}
          <li>
            <a href="http://dhs.kerala.gov.in/">
              Directorate of Health Services, Kerala
            </a>
          </li>
          <li>
            <a href="https://www.livemint.com/">Livemint</a>
          </li>
          <li>
            <a href="https://www.deccanherald.com/national/coronavirus-live-updates-bbmp-orders-closure-of-air-conditioned-supermarkets-across-bengaluru-799686.html#2">
              Deccan Herald
            </a>
          </li>
          <li>
            <a href="https://economictimes.indiatimes.com/">Economic Times</a>
          </li>
          <li>
            <a href="https://www.thehindu.com/">The Hindu</a>
          </li>
        </ul>
        In case you find any error, please tweet out to:{" "}
        <a href="https://twitter.com/covindia">covindia</a>.
        <br />
        <br />
        If you like our visualisations and need help to make your data talk,
        drop a mail to achal.agarwal[at]mechyd.ac.in
        <br />
        <br />
        <div className="row">
          <div className="col-md-4"></div>
          <div className="col-md-4">
            <div style={{ display: "flex", justifyContent: "center" }}>
              <a href="https://www.mahindraecolecentrale.edu.in/">
                <img src="/img/MECLogo.png" width="100%" alt="MEC" />
              </a>
            </div>
          </div>
          <div className="col-md-4"></div>
        </div>
        <br />
        <br />
        <p />
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
            In case you find any error, please tweet out to:{" "}
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
            <br />
            Click here for:{" "}
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

export default About;
