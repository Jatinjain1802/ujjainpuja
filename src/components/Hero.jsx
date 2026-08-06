import React, { useContext } from "react";
import "./Hero.css";
import heroBg from "../assets/hero_bg.png"; // We keep the existing bg or can update it later
import { FaWhatsapp, FaArrowRight } from "react-icons/fa"; // Ensure react-icons is installed
import { LocaleContext } from "../LocaleContext";

const Hero = () => {
  const { messages } = useContext(LocaleContext);

  return (
    <section
      id="home"
      className="hero"
      style={{ backgroundImage: `url(${heroBg})` }}
    >
      <div className="hero-overlay"></div>
      <div className="container hero-content">
        <div className="hero-glass-panel glass-panel">
          <h1>
            {messages.hero.titlePrefix} <span>{messages.hero.highlight}</span>{" "}
            {messages.hero.titleSuffix}
          </h1>
          <p className="hero-subtitle">{messages.hero.subtitle}</p>
          <p className="hero-desc">{messages.hero.description}</p>
          <div className="hero-buttons">
            <a href="#about" className="btn-primary">
              {messages.hero.primaryButton}{" "}
              <FaArrowRight style={{ marginLeft: "8px" }} />
            </a>
            <a
              href={`https://wa.me/919039095999?text=${encodeURIComponent(messages.whatsapp.generic)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary whatsapp-btn"
            >
              {messages.hero.whatsappButton}
              <FaWhatsapp style={{ marginLeft: "8px", fontSize: "1.2rem" }} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
