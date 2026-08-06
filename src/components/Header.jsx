import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Phone } from "./icons";
import logoImage from "../assets/logo.png";
import "./Header.css";
import { LocaleContext } from "../LocaleContext";

const Header = () => {
  const { locale, setLocale, messages } = useContext(LocaleContext);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    // lock body scroll when mobile menu is open
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  return (
    <header className={`header ${isScrolled ? "scrolled" : ""}`}>
      <div className="container header-container">
        <Link to="/" className="logo-link" aria-label={messages.header.logoAlt}>
          <img
            src={logoImage}
            alt={messages.header.logoAlt}
            className="logo-image"
          />
        </Link>

        <nav
          id="mobile-nav"
          className={`desktop-nav ${isMobileMenuOpen ? "mobile-open" : ""}`}
          aria-hidden={!isMobileMenuOpen}
        >
          <Link to="/" onClick={toggleMobileMenu}>
            {messages.header.nav.home}
          </Link>
          <a href="/#services" onClick={toggleMobileMenu}>
            {messages.header.nav.services}
          </a>
          <a href="/about" onClick={toggleMobileMenu}>
            {messages.header.nav.about}
          </a>
          <a href="/#contact" onClick={toggleMobileMenu}>
            {messages.header.nav.contact}
          </a>
          <a href="tel:+91919039095999" className="btn-primary phone-btn">
            <Phone size={18} />
            <span>+91 919039095999</span>
          </a>
          <div className="language-switcher">
            <div
              className="language-toggle"
              role="tablist"
              aria-label={messages.header.languageLabel}
            >
              <button
                type="button"
                role="tab"
                aria-selected={locale === "hi"}
                className={`lang-btn ${locale === "hi" ? "active" : ""}`}
                onClick={() => setLocale("hi")}
              >
                हिन्दी
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={locale === "en"}
                className={`lang-btn ${locale === "en" ? "active" : ""}`}
                onClick={() => setLocale("en")}
              >
                English
              </button>
            </div>
          </div>
        </nav>

        <button
          className={`mobile-menu-btn ${isMobileMenuOpen ? "open" : ""}`}
          onClick={toggleMobileMenu}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-nav"
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {isMobileMenuOpen && (
        <div
          className="mobile-overlay"
          onClick={toggleMobileMenu}
          aria-hidden="true"
        />
      )}
    </header>
  );
};

export default Header;
