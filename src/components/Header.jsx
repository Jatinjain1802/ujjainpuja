import React, { useContext, useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Phone } from "./icons";
import logoImage from "../assets/logo.png";
import "./Header.css";
import { LocaleContext } from "../LocaleContext";

const Header = () => {
  const { locale, setLocale, messages } = useContext(LocaleContext);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navRef = useRef(null);
  const btnRef = useRef(null);

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

  const closeMobileMenu = () => {
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  };

  useEffect(() => {
    // lock body scroll when mobile menu is open
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      // focus the first focusable element inside the mobile nav for accessibility
      const navEl = navRef.current;
      if (navEl) {
        const firstFocusable = navEl.querySelector(
          'a, button, [tabindex]:not([tabindex="-1"])',
        );
        if (firstFocusable) firstFocusable.focus();
      }
    } else {
      // return focus to the menu button when closing
      if (btnRef.current) btnRef.current.focus();
    }

    const handleKey = (e) => {
      if (e.key === "Escape" && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isMobileMenuOpen]);

  return (
    <header className={`header ${isScrolled ? "scrolled" : ""}`}>
      <div className="container header-container">
        <Link
          to="/#home"
          className="logo-link"
          aria-label={messages.header.logoAlt}
        >
          <img
            src={logoImage}
            alt={messages.header.logoAlt}
            className="logo-image"
          />
        </Link>

        <nav
          id="mobile-nav"
          ref={navRef}
          className={`desktop-nav ${isMobileMenuOpen ? "mobile-open" : ""}`}
          aria-hidden={!isMobileMenuOpen}
        >
          <Link to="/#home" onClick={closeMobileMenu}>
            {messages.header.nav.home}
          </Link>
          <Link to="/#services" onClick={closeMobileMenu}>
            {messages.header.nav.services}
          </Link>
          <Link to="/#about" onClick={closeMobileMenu}>
            {messages.header.nav.features}
          </Link>
          <Link to="/#contact" onClick={closeMobileMenu}>
            {messages.header.nav.contact}
          </Link>
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
          ref={btnRef}
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
