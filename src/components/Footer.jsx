import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Instagram, MapPin, Phone } from "./icons";
import "./Footer.css";
import { LocaleContext } from "../LocaleContext";

const Footer = () => {
  const { messages } = useContext(LocaleContext);
  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="footer-col">
          <h3>{messages.footer.title}</h3>
          <p>{messages.footer.description}</p>
          <div className="social-links">
            <a
              href="https://www.instagram.com/awantikakevikrantbhairav"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Instagram />
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=61587146622547"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-facebook"
              >
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </a>
          </div>
        </div>

        <div className="footer-col">
          <h3>{messages.footer.servicesHeading}</h3>
          <ul>
            {[
              "Shani Dosh Nivaran / शनि दोष निवारण",
              "Navgraha Shanti / नवग्रह शांति",
              "Mahamrityunjay Japa / महामृत्युंजय जप",
              "Yagya & Havan / यज्ञ एवं हवन",
            ].map((serviceTitle) => (
              <li key={serviceTitle}>
                <Link to="/services#services">{serviceTitle}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-col">
          <h3>{messages.footer.quickLinksHeading}</h3>
          <ul>
            {messages.footer.quickLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-col">
          <h3>{messages.footer.contactHeading}</h3>
          <ul className="contact-info">
            <li>
              <Phone size={18} className="contact-icon" />
              <a href="tel:+91919039095999">+91 919039 095999</a>
            </li>
            <li>
              <MapPin size={18} className="contact-icon" />
              <span>{messages.footer.locationText}</span>
            </li>
          </ul>
        </div>

        <div className="footer-col map-col">
          <h3>{messages.footer.locationHeading}</h3>
          <div className="map-container glass-panel">
            <iframe
              loading="lazy"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d117462.62534571167!2d75.70776510427845!3d23.165681602737526!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39637469de00ff23%3A0x7f82abdf7899d412!2sUjjain%2C%20Madhya%20Pradesh!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              title="Vikrant Bhairav Ujjain"
              aria-label="Vikrant Bhairav Ujjain"
              width="100%"
              height="150"
              style={{ border: 0, borderRadius: "8px" }}
              allowFullScreen=""
            ></iframe>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>
          {messages.footer.copyright.replace(
            "{year}",
            String(new Date().getFullYear()),
          )}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
