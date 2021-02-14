import React, { useState } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import "./BulmaHeader.css";

function BulmaHeader() {
  const [isActive, setIsActive] = useState(false);

  return (
    <section id="hero" className="hero is-custom-color is-large">
      <div className="hero-head shadowed-twice">
        <nav className="navbar is-custom-background-color">
          <div className="container">
            <div className="navbar-brand">
              <a className="navbar-item">
                <p className="subtitle text-custom-color">Image Gallery</p>
              </a>
              <span
                className={`navbar-burger ${isActive ? "is-active" : ""}`}
                data-target="navbarMenuHeroA"
                onClick={() => {
                  setIsActive(!isActive);
                }}
              >
                <span></span>
                <span></span>
                <span></span>
              </span>
            </div>
            <div
              id="navbarMenuHeroA"
              className={`navbar-menu ${isActive ? "is-active" : ""}`}
            >
              <div className="navbar-end">
                <span className="navbar-item">
                  <a
                    className="button is-custom-color is-inverted"
                    href="https://www.linkedin.com/in/danny-fung/"
                  >
                    <span className="icon">
                      <FaLinkedin />
                    </span>
                    <span>Linkedin</span>
                  </a>
                </span>
                <span className="navbar-item">
                  <a
                    className="button is-custom-color is-inverted"
                    href="https://github.com/DannyFung97/image-gallery-project"
                  >
                    <span className="icon">
                      <FaGithub />
                    </span>
                    <span>Github</span>
                  </a>
                </span>
              </div>
            </div>
          </div>
        </nav>
      </div>

      <div className="hero-body shadowed">
        <div className="container has-text-centered">
          <p className="title text-custom-color">Gatsby Image Gallery</p>
          <p className="subtitle text-custom-color">
            Personal project made with Gatsby, Cloudinary, Bulma, and original
            images.
          </p>
        </div>
      </div>
    </section>
  );
}

export default BulmaHeader;
